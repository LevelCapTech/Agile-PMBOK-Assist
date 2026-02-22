export type StatusMessageProps = {
  title: string;
  description: string;
};

export const StatusMessage = ({ title, description }: StatusMessageProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
};
