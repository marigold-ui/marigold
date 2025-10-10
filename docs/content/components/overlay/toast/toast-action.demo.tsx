import { Button, Link, useToast } from '@marigold/components';

export default () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-row gap-2">
      <Button
        onPress={() =>
          addToast({
            title: 'Update Available',
            variant: 'info',
            description: 'A new version is available.',
            timeout: 0,
            action: (
              <Link size="small" href="https://github.com/marigold-ui/marigold">
                Update now
              </Link>
            ),
          })
        }
      >
        Show Toast with Link
      </Button>
      <Button
        onPress={() =>
          addToast({
            title: 'File Upload Failed',
            variant: 'error',
            description:
              'The file could not be uploaded due to network issues.',
            timeout: 0,
            action: (
              <Button size="small" variant="primary">
                Retry
              </Button>
            ),
          })
        }
      >
        Show Toast with Button
      </Button>
    </div>
  );
};
