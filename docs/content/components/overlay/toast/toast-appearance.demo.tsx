import { MyToastContent, Toast } from '@marigold/components';

export default (props: MyToastContent) => (
  <div className="z-1">
    <Toast position="bottom-right" {...props}></Toast>

    <Toast.Content
      toast={{
        content: {
          title: 'Toast Title 2',
          description: 'Toast Description',
          variant: props.variant, // or "success", "error", "warning", "info"
        },
        key: 'toast-key', // Unique key for the toast
      }}
    />
  </div>
);
