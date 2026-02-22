type HelloCardProps = {
  title: string;
  message: string;
};

export const HelloCard = ({ title, message }: HelloCardProps) => {
  return (
    <section className="flex w-full max-w-md flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-zinc-600">{message}</p>
    </section>
  );
};
