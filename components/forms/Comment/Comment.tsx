"use client";

import { commentValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { CommentFormValues, CommentProps } from "./Comment.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/shared/Avatar";
import { addCommentToThread } from "@/lib/actions/thread.actions";

const Comment = ({
  parentThreadId,
  authorProfileImage,
  authorId,
}: CommentProps) => {
  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      commentText: "",
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    await addCommentToThread(parentThreadId, values.commentText, authorId);

    form.reset();
  };

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex justify-start items-center gap-10"
        >
          <FormField
            control={form.control}
            name="commentText"
            render={({ field }) => (
              <FormItem className="flex w-full gap-3 items-center">
                <FormLabel className="mt-2 text-base-semibold text-light-2">
                  <Avatar
                    imageUrl={authorProfileImage}
                    width={48}
                    height={48}
                    alt="Profile image"
                  />
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    {...field}
                    placeholder="Comment..."
                    style={{
                      marginTop: 0,
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
