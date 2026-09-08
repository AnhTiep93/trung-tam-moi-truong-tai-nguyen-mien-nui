import ReactMarkdown from "react-markdown";

export function RichText({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-primary-600">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
