"use client";

import { useState, useActionState } from "react";
// import createPost from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHightlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divide } from "lucide-react";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿（Mackdown対応）</h1>
      <form className="space-y-4" action="">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください。"
          />
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
