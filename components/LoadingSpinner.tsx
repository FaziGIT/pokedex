export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-black rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
