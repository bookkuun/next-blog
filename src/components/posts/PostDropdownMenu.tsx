"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useState } from "react";
import DeleteDropDialog from "@/components/posts/DeletePostDialog";

const PostDropdownMenu = ({ postId }: { postId: string }) => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="px-2 py-1 border rounded-md">
          ⋯
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}`} className="cursor-pointer">
              詳細
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/manage/posts/${postId}/edit`}
              className="cursor-pointer"
            >
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onSelect={() => {
              setIsDropdownOpen(false);
              setShowDeleteDialog(true);
            }}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteDialog && (
        <DeleteDropDialog
          postId={postId}
          isOpen={showDeleteDialog}
          onOpenChange={handleDeleteDialogChange}
        />
      )}
    </>
  );
};

export default PostDropdownMenu;
