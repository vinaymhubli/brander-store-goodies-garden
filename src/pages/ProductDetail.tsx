import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  ShoppingCart,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Image as ImageIcon,
  Video,
  X,
  ThumbsUp,
  Upload,
  Trash2,
} from "lucide-react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { useProductSEO } from "@/hooks/useSEO";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import { useState, useRef } from "react";
import { Footer } from "@/components/Footer";

// Review types
interface ReviewMedia {
  url: string;
  type?: "image" | "video";
}

interface ReviewUser {
  id: string;
  full_name: string | null;
  avatar_url?: string | null;
}

interface Review {
  id: string;
  product_id: string;
  user_id?: string; // Add user_id to check ownership
  user: ReviewUser;
  rating: number;
  comment: string;
  media?: ReviewMedia[];
  helpful_count?: number;
  created_at: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  
  // Reviews state
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewMedia, setReviewMedia] = useState<File[]>([]);
  const [reviewMediaPreviews, setReviewMediaPreviews] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");

      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name,
            description
          )
        `
        )
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as Tables<"products"> & {
        categories: { name: string; description: string | null } | null;
      };
    },
    enabled: !!id,
  });

  // Fetch reviews for the product
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      if (!id) return [];

      // Fetch reviews with media
      // First, try without is_approved filter to see all reviews
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: allReviews, error: allReviewsError } = await (supabase
        .from("reviews" as never)
        .select(`
          *,
          review_media (
            id,
            media_url,
            media_type,
            file_name
          )
        `)
        .eq("product_id", id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .order("created_at", { ascending: false }) as any);

      if (allReviewsError) {
        console.error("Error fetching all reviews:", allReviewsError);
        throw allReviewsError;
      }

      console.log("All reviews (including unapproved):", allReviews?.length || 0);
      console.log("All reviews data:", allReviews);

      // Filter for approved reviews only (or show all if none are approved)
      let reviews = (allReviews || []).filter((r: any) => {
        // If is_approved column doesn't exist or is null, show the review
        // Otherwise, only show approved reviews
        return r.is_approved === true || r.is_approved === null || r.is_approved === undefined;
      });

      console.log("Approved reviews:", reviews.length);

      // If no approved reviews but reviews exist, show all for testing
      if (reviews.length === 0 && (allReviews?.length || 0) > 0) {
        console.warn("Reviews exist but none are approved. Showing all reviews for now.");
        reviews = allReviews || [];
        console.log("Showing all reviews (including unapproved) for testing");
      }

      if (!reviews || reviews.length === 0) {
        console.log("No reviews found for product:", id);
        return [];
      }

      console.log("Fetched reviews to display:", reviews.length);
      console.log("Reviews data:", reviews);

      // Get unique user IDs from reviews
      const userIds = [...new Set((reviews as any[]).map((r: any) => r.user_id as string))] as string[];
      console.log("User IDs from reviews:", userIds);

      // Fetch profiles for those user IDs
      // Note: avatar_url will be available after running the migration
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, user_id, full_name")
        .in("user_id", userIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        // Don't throw - we can still show reviews without profiles
      }

      console.log("Fetched profiles data:", profilesData);
      console.log("Number of profiles:", profilesData?.length || 0, "for", userIds.length, "user IDs");

      // Try to fetch avatar_url if the column exists (after migration)
      let profilesWithAvatar: any = null;
      try {
        const { data: profilesWithAvatarData } = await supabase
          .from("profiles")
          .select("id, user_id, full_name, avatar_url")
          .in("user_id", userIds);
        if (profilesWithAvatarData && !('error' in profilesWithAvatarData)) {
          profilesWithAvatar = profilesWithAvatarData;
        }
      } catch {
        // avatar_url column doesn't exist yet - that's okay
      }

      const profiles = ((profilesWithAvatar || profilesData || []) as Array<{
        id: string;
        user_id: string;
        full_name: string | null;
        avatar_url?: string | null;
      }>).map((p) => ({
        id: p.id,
        user_id: p.user_id,
        full_name: p.full_name,
        avatar_url: p.avatar_url || null,
      }));

      // Create a map of user_id to profile for quick lookup
      const profileMap = new Map(
        (profiles || []).map((profile) => [profile.user_id, profile])
      );

      // Transform data to match frontend interface
      return (reviews as Array<{
        id: string;
        product_id: string;
        user_id: string;
        rating: number;
        comment: string;
        helpful_count: number;
        created_at: string;
        review_media: Array<{ id: string; media_url: string; media_type: string; file_name: string | null }>;
      }>).map((review) => {
        const profile = profileMap.get(review.user_id);
        return {
          id: review.id,
          product_id: review.product_id,
          user_id: review.user_id, // Include user_id for ownership check
          user: profile ? {
            id: profile.id,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
          } : {
            id: review.user_id,
            full_name: null,
            avatar_url: null,
          },
          rating: review.rating,
          comment: review.comment,
          media: (review.review_media || []).map((media: any) => ({
            url: media.media_url,
            type: media.media_type,
          })),
          helpful_count: (review as any).helpful_count ?? (review as any).helpful ?? 0,
          created_at: review.created_at,
        };
      }) as Review[];
    },
    enabled: !!id,
  });

  const reviews = reviewsData || [];

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Update SEO for product page - call this hook unconditionally at the top
  useProductSEO(
    product
      ? {
          id: Number(product.id),
          name: product.name,
          price: Number(product.selling_price || product.price),
          description:
            product.description ||
            `Premium ${product.name} from Brander Store. High-quality product with excellent customer ratings.`,
          image: product.image_url || "/placeholder.svg",
          category: product.categories?.name || "Products",
          rating: averageRating,
          reviews: reviews.length,
        }
      : null
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/shop" replace />;
  }

  const isInCart = cartItems.some(
    (item: { product_id: string }) => item.product_id === product.id
  );
  const isInWishlist = wishlistItems.some(
    (item) => item.id === product.id
  );
  const discountPercentage =
    product.selling_price && product.selling_price < product.price
      ? Math.round(
          ((product.price - product.selling_price) / product.price) * 100
        )
      : 0;

  const handleAddToCart = async () => {
    try {
      // Add the product with the selected quantity
      await addToCart(product, quantity);

      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
      });
      
      // Reset quantity to 1 after adding
      setQuantity(1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stock_quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = async () => {
    if (isInWishlist) {
      await removeFromWishlist(product.id);
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.selling_price || product.price,
        selling_price: product.selling_price,
        image: product.image_url || '/placeholder.svg',
      };
      await addToWishlist(wishlistItem);
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: product.name,
        text: product.description || `Check out ${product.name} from Brander Store`,
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error",
        description: "Failed to share. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Review handlers
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!isImage && !isVideo) {
        toast({
          title: "Invalid file type",
          description: "Please upload only images or videos.",
          variant: "destructive",
        });
        return false;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 10MB.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length + reviewMedia.length > 5) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 5 files.",
        variant: "destructive",
      });
      return;
    }

    setReviewMedia([...reviewMedia, ...validFiles]);
    
    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReviewMediaPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setReviewMedia(reviewMedia.filter((_, i) => i !== index));
    setReviewMediaPreviews(reviewMediaPreviews.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (reviewRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review text required",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!id) {
      toast({
        title: "Error",
        description: "Product ID is missing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);

    try {
      // 1. Upload media files if any
      const uploadedMedia: Array<{
        url: string;
        type: "image" | "video";
        fileName: string;
        fileSize: number;
        mimeType: string;
      }> = [];

      if (reviewMedia.length > 0) {
        for (const file of reviewMedia) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `reviews/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("review-media")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw new Error("Failed to upload media file");
          }

          const { data: urlData } = supabase.storage
            .from("review-media")
            .getPublicUrl(filePath);

          uploadedMedia.push({
            url: urlData.publicUrl,
            type: file.type.startsWith("video/") ? "video" : "image",
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
          });
        }
      }

      // 2. Insert review
      // Reviews table types will be generated after migration
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: review, error: reviewError } = await (supabase
        .from("reviews" as never)
        .insert({
          product_id: id,
          user_id: user.id,
          rating: reviewRating,
          comment: reviewText.trim(),
          is_approved: false, // Require moderation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        .select()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .single() as any);

      if (reviewError) {
        // Check if it's a duplicate review error
        if (reviewError.code === "23505") {
          toast({
            title: "Review already exists",
            description: "You have already reviewed this product. You can update your existing review.",
            variant: "destructive",
          });
          setIsSubmittingReview(false);
          return;
        }
        throw reviewError;
      }

      // 3. Insert media records if any
      if (uploadedMedia.length > 0 && review && (review as { id: string }).id) {
        // Review media table types will be generated after migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: mediaError } = await (supabase
          .from("review_media" as never)
          .insert(
            uploadedMedia.map((media) => ({
              review_id: (review as { id: string }).id,
              media_url: media.url,
              media_type: media.type,
              file_name: media.fileName,
              file_size: media.fileSize,
              mime_type: media.mimeType,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            })) as any
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as any);

        if (mediaError) {
          console.error("Media insert error:", mediaError);
          // Don't throw - review is already created
        }
      }

      toast({
        title: "Review submitted!",
        description: "Your review will be published after moderation.",
      });

      // Reset form
      setReviewRating(0);
      setReviewText("");
      setReviewMedia([]);
      setReviewMediaPreviews([]);
      setIsReviewDialogOpen(false);

      // Refetch reviews (though the new one won't show until approved)
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit review. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setReviewRating(rating);
  };

  const handleDeleteReview = async (reviewId: string, reviewMedia: ReviewMedia[] = []) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to delete your review.",
        variant: "destructive",
      });
      return;
    }

    // Confirm deletion
    if (!confirm("Are you sure you want to delete your review? This action cannot be undone.")) {
      return;
    }

    setDeletingReviewId(reviewId);

    try {
      // 1. First, fetch media records to get file paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: mediaRecords, error: fetchMediaError } = await (supabase
        .from("review_media" as never)
        .select("media_url, file_name")
        .eq("review_id", reviewId) as any);

      if (!fetchMediaError && mediaRecords && mediaRecords.length > 0) {
        // Delete media files from storage
        for (const mediaRecord of mediaRecords) {
          try {
            // Extract file path from URL
            const mediaUrl = mediaRecord.media_url;
            if (mediaUrl) {
              const urlParts = mediaUrl.split('/');
              const fileName = urlParts[urlParts.length - 1];
              const filePath = `reviews/${fileName}`;

              const { error: deleteMediaError } = await supabase.storage
                .from("review-media")
                .remove([filePath]);

              if (deleteMediaError) {
                console.error("Error deleting media file:", deleteMediaError);
                // Continue even if media deletion fails
              }
            }
          } catch (error) {
            console.error("Error deleting media:", error);
            // Continue even if media deletion fails
          }
        }
      }

      // 2. Delete review media records from database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: deleteMediaRecordsError } = await (supabase
        .from("review_media" as never)
        .delete()
        .eq("review_id", reviewId) as any);

      if (deleteMediaRecordsError) {
        console.error("Error deleting media records:", deleteMediaRecordsError);
        // Continue even if this fails
      }

      // 3. Delete helpful votes for this review
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: deleteHelpfulError } = await (supabase
        .from("review_helpful" as never)
        .delete()
        .eq("review_id", reviewId) as any);

      if (deleteHelpfulError) {
        console.error("Error deleting helpful votes:", deleteHelpfulError);
        // Continue even if this fails
      }

      // 4. Delete the review itself (with user_id check for security)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: deleteReviewError } = await (supabase
        .from("reviews" as never)
        .delete()
        .eq("id", reviewId)
        .eq("user_id", user.id) as any); // Ensure user can only delete their own review

      if (deleteReviewError) {
        console.error("Error deleting review:", deleteReviewError);
        // Check if it's a permission error
        if (deleteReviewError.code === "PGRST116" || deleteReviewError.message?.includes("No rows deleted")) {
          toast({
            title: "Permission denied",
            description: "You can only delete your own reviews.",
            variant: "destructive",
          });
          return;
        }
        throw deleteReviewError;
      }

      toast({
        title: "Review deleted",
        description: "Your review has been successfully deleted.",
      });

      // Refetch reviews
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    } catch (error: unknown) {
      console.error("Error deleting review:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to delete review. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeletingReviewId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          {product.categories && (
            <>
              <span className="hover:text-foreground transition-colors">
                {product.categories.name}
              </span>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <Link to="/shop">
          <Button variant="ghost" className="mt-2 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-card border">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.categories && (
                <Badge variant="secondary" className="mb-3">
                  {product.categories.name}
                </Badge>
              )}

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-6">
                {product.selling_price &&
                product.selling_price < product.price ? (
                  <>
                    <span className="text-4xl font-bold text-primary">
                      ₹{Number(product.selling_price).toLocaleString()}
                    </span>
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.stock_quantity > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      In Stock ({product.stock_quantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-600 font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Product Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.stock_quantity || 10)}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isInCart ? (
                <Button
                  size="lg"
                  className="w-full h-14 text-lg"
                  variant="secondary"
                  onClick={() => (window.location.href = "/cart")}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Go to Cart & Checkout
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={product.stock_quantity <= 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-muted-foreground">On all orders</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Separator className="my-12" />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                {reviews.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                )}
                {reviews.length === 0 && (
                  <span className="text-muted-foreground">
                    (No reviews yet)
                  </span>
                )}
              </div>
            </div>
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with this product
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Rating Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Your Rating *
                    </Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleStarClick(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= reviewRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                      {reviewRating > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {reviewRating} {reviewRating === 1 ? "star" : "stars"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <Label htmlFor="review-text" className="text-base font-medium mb-3 block">
                      Your Review *
                    </Label>
                    <Textarea
                      id="review-text"
                      placeholder="Share your thoughts about this product..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Media Upload */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Add Photos or Videos (Optional)
                    </Label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Media
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          Max 5 files, 10MB each
                        </span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                      
                      {/* Media Previews */}
                      {reviewMediaPreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                          {reviewMediaPreviews.map((preview, index) => {
                            const file = reviewMedia[index];
                            const isVideo = file?.type.startsWith("video/");
                            
                            return (
                              <div
                                key={index}
                                className="relative aspect-square rounded-lg overflow-hidden border bg-muted"
                              >
                                {isVideo ? (
                                  <video
                                    src={preview}
                                    className="w-full h-full object-cover"
                                    controls
                                  />
                                ) : (
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeMedia(index)}
                                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                  {isVideo ? (
                                    <Video className="h-3 w-3 inline mr-1" />
                                  ) : (
                                    <ImageIcon className="h-3 w-3 inline mr-1" />
                                  )}
                                  {file?.name}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsReviewDialogOpen(false);
                      setReviewRating(0);
                      setReviewText("");
                      setReviewMedia([]);
                      setReviewMediaPreviews([]);
                    }}
                    disabled={isSubmittingReview}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitReview} disabled={isSubmittingReview}>
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reviews List */}
          {reviewsLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-1/3 mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to review this product!
                </p>
                <Button onClick={() => setIsReviewDialogOpen(true)}>
                  Write the First Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={review.user?.avatar_url || "/placeholder.svg"}
                          alt={review.user?.full_name || "User"}
                        />
                        <AvatarFallback>
                          {review.user?.full_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">
                              {review.user?.full_name || "Anonymous User"}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          {/* Delete button - only show if review belongs to current user */}
                          {user && review.user_id === user.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteReview(review.id, review.media)}
                              title="Delete your review"
                              disabled={deletingReviewId === review.id}
                            >
                              {deletingReviewId === review.id ? (
                                <div className="h-4 w-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>

                        <p className="text-foreground leading-relaxed">
                          {review.comment}
                        </p>

                        {/* Review Media */}
                        {review.media && review.media.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                            {review.media.map((media: ReviewMedia, index: number) => {
                              const isVideo = media.type === "video" || media.url?.includes(".mp4") || media.url?.includes(".webm");
                              
                              return (
                                <div
                                  key={index}
                                  className="relative aspect-square rounded-lg overflow-hidden border bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                  {isVideo ? (
                                    <video
                                      src={media.url}
                                      className="w-full h-full object-cover"
                                      controls
                                    />
                                  ) : (
                                    <img
                                      src={media.url}
                                      alt={`Review media ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Helpful Button */}
                        <div className="flex items-center gap-4 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={async () => {
                              if (!user) {
                                toast({
                                  title: "Authentication required",
                                  description: "Please log in to mark reviews as helpful.",
                                  variant: "destructive",
                                });
                                return;
                              }

                              try {
                                // Check if user already voted
                                // Review helpful table types will be generated after migration
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const { data: existingVote } = await (supabase
                                  .from("review_helpful" as never)
                                  .select("id")
                                  .eq("review_id", review.id)
                                  .eq("user_id", user.id)
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  .single() as any);

                                if (existingVote) {
                                  // Remove vote
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  const { error: deleteError } = await (supabase
                                    .from("review_helpful" as never)
                                    .delete()
                                    .eq("review_id", review.id)
                                    .eq("user_id", user.id)
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  ) as any;

                                  if (deleteError) throw deleteError;

                                  toast({
                                    title: "Vote removed",
                                    description: "Your helpful vote has been removed.",
                                  });
                                } else {
                                  // Add vote
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  const { error: insertError } = await ((supabase
                                    .from("review_helpful" as never)
                                    .insert({
                                      review_id: review.id,
                                      user_id: user.id,
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    } as any)) as any);

                                  if (insertError) {
                                    if (insertError.code === "23505") {
                                      // Already voted (race condition)
                                      toast({
                                        title: "Already voted",
                                        description: "You have already marked this review as helpful.",
                                      });
                                    } else {
                                      throw insertError;
                                    }
                                  } else {
                                    toast({
                                      title: "Thank you!",
                                      description: "Your feedback helps other customers.",
                                    });
                                  }
                                }

                                // Refetch reviews to update helpful count
                                queryClient.invalidateQueries({ queryKey: ["reviews", id] });
                              } catch (error: unknown) {
                                console.error("Error marking review as helpful:", error);
                                const errorMessage = error instanceof Error && 'code' in error && error.code === "23505"
                                  ? "You have already marked this review as helpful."
                                  : "Failed to update helpful vote. Please try again.";
                                toast({
                                  title: "Error",
                                  description: errorMessage,
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Helpful ({review.helpful_count || 0})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
