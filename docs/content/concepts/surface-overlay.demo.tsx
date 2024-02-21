export default () => {
  return (
    <div className="m-auto w-96">
      <FieldBase isOpen as={Select} ref={ref} {...props}>
        <Button
          className={cn(
            'flex w-full items-center justify-between gap-1 overflow-hidden',
            classNames.select
          )}
        >
          <SelectValue />
          <ChevronDown className="size-4" />
        </Button>
        <Popover>
          <ListBox items={items}>{props.children}</ListBox>
        </Popover>
      </FieldBase>
    </div>
  );
};
