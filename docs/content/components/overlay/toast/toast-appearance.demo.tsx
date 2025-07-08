import { MyToastContent, Toast } from '@marigold/components';

export default (props: MyToastContent) => (
  <div className="z-1">
    <Toast position="bottom-right" {...props}></Toast>

    <Toast.Content
      toast={{
        content: {
          title: props.variant + ' toast title',
          description: props.variant + ' toast description',
          variant: props.variant, // or "success", "error", "warning", "info"
        },
        key: 'toast-key', // Unique key for the toast
      }}
    />
  </div>
);
