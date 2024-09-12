import { MessageProps } from '../../types';

export const Incoming = ({ content }: MessageProps) => {
  return (
    <div className="flex">
      <p className="bg-accent mb-8 w-[calc(60vw)] max-w-fit rounded-md p-4 md:w-[calc(30vw)]">
        {content}
      </p>
    </div>
  );
};
