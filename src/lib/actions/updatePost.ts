"use server";

import { saveImage } from "@/utils/image";
import { postSchema } from "@/validations/post";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function updatePost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォーム情報を取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;
  const postId = formData.get("postId") as string;
  const published = formData.get("published") === "true";
  const oldImageUrl = formData.get("oldImageUrl") as string;

  // バリデーション
  const validationResult = postSchema.safeParse({
    title,
    content,
    topImage,
  });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  // 画像の保存
  let imageUrl = oldImageUrl;
  if (
    topImage instanceof File &&
    topImage.size > 0 &&
    topImage.name !== "undefined"
  ) {
    const newImageUrl = await saveImage(topImage);

    if (!newImageUrl) {
      return {
        success: false,
        errors: { topImage: ["画像の保存に失敗しました。"] },
      };
    }
    imageUrl = newImageUrl;
  }

  // DBに更新保存
  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      published,
      topImage: imageUrl,
    },
  });

  redirect("/dashboard");
}
