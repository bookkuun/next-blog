import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PostCardProps } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="hover:shadow-lg transition-shadow pt-0">
        {post.topImage && (
          <div className="relative w-full h-48">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
