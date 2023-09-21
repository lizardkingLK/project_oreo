import Close from '@/components/svgs/close';
import Send from '@/components/svgs/send';
import { IUIProps } from '@/types';
import { actions } from '@/utils/enums';
import React from 'react';

const SubmitButton = (props: {
  context: actions;
  onSubmitHandler: Function;
  ui: IUIProps;
}) => {
  const { context, onSubmitHandler, ui } = props;
  if (context === actions.create || context === actions.edit) {
    return (
      <button
        type="submit"
        className="p-2 md:p-4 rounded-r-full bg-green-500 hover:bg-green-600 text-white"
        title="Send Message"
        onClick={() => onSubmitHandler(context)}
      >
        <Send size={ui.iconSize} />
      </button>
    );
  } else if (context === actions.beforeEdit) {
    return (
      <button
        type="submit"
        className="p-2 md:p-4 rounded-r-full bg-green-500 hover:bg-green-600 text-white"
        title="Cancel Edit"
        onClick={() => onSubmitHandler(context)}
      >
        <Close size={ui.iconSize} />
      </button>
    );
  } else return null;
};

export default SubmitButton;
