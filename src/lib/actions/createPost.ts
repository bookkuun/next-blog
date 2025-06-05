"use server";

import { saveImage } from "@/utils/image";
import { postSchema } from "@/validations/post";
import { prisma } from "../prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォーム情報を取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;

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
  const imageUrl = topImage ? await saveImage(topImage) : null;
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: { topImage: ["画像の保存に失敗しました。"] },
    };
  }

  // DBに登録
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです。");
  }

  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
      authorId: userId,
    },
  });

  redirect("/dashboard");
}
