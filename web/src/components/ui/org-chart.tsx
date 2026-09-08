export function OrgChart({ levels }: { levels: string[] }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {levels.map((level, index) => (
        <div key={level} className="flex flex-col items-center">
          <div className="rounded-lg border border-primary-200 bg-primary-50 px-6 py-3 text-center font-medium text-primary-700">
            {level}
          </div>
          {index < levels.length - 1 ? (
            <div className="my-1 h-6 w-px bg-primary-200" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
