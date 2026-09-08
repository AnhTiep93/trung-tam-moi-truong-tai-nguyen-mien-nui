export interface TimelineMilestone {
  year: string;
  text: string;
}

export function Timeline({ milestones }: { milestones: TimelineMilestone[] }) {
  return (
    <ol className="relative space-y-8 border-l-2 border-primary-100 pl-6">
      {milestones.map((milestone, index) => (
        <li key={index} className="relative">
          <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full border-2 border-primary-500 bg-white" />
          <p className="text-sm font-semibold text-primary-600">
            {milestone.year}
          </p>
          <p className="mt-1 text-neutral-700">{milestone.text}</p>
        </li>
      ))}
    </ol>
  );
}
