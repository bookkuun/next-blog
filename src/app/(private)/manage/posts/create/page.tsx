"use client";

import { useState, useActionState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHightlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/createPost";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);

  const [state, formAction] = useActionState(createPost, {
    success: true,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿（Mackdown対応）</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください。"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input type="file" id="topImage" accept="image/*" name="topImage" />
          {state.errors.topImage && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.topImage.join(", ")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="content">内容</Label>
          <TextareaAutosize
            id="content"
            name="content"
            className="w-full p-2 border rounded-md "
            placeholder="Markdown形式で内容を入力してください。"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.content.join(", ")}
            </p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mtß-1">
          文字数：{contentLength}
        </div>
        <Button type="button" onClick={() => setPreview(!preview)}>
          {preview ? "プレビューを閉じる" : "プレビューを表示"}
        </Button>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHightlight]}
              skipHtml
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <div>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            投稿する
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
