"use client";

import { useForm } from "react-hook-form";
import { PostThreadFormValues, PostThreadProps } from "./PostThread.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadValidation } from "@/lib/validations";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createThread } from "@/lib/actions/thread.actions";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

const PostThread = ({ userId }: PostThreadProps) => {
  const router = useRouter();

  const form = useForm<PostThreadFormValues>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (formData: PostThreadFormValues) => {
    await createThread({
      text: formData.thread,
      author: userId,
      communityId: null,
      path: ROUTES.home.createThread,
    });

    router.push(ROUTES.home.root);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus, border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  {...field}
                  rows={15}
                  placeholder="Type your message here."
                  className="no-scrollbar"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
