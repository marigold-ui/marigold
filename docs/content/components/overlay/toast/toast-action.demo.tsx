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
        Show Toast
      </Button>
    </div>
  );
};
