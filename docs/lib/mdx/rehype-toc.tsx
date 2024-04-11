import { toc } from 'mdast-util-toc';
import { visit } from 'unist-util-visit';

// go through all mdast elements and find the h2 and h3
// if not return
// if found than put in a list

export const rehypeTableOfContents = () => {
  return (tree: any) => {
    const items: any[] = [];
    // going through all the node tree
    visit(tree, 'element', node => {
      // if no headline than return
      if (node.tagName !== 'h2' && node.tagName !== 'h3') {
        return;
      }
      // if a headline than go through the headline children and get the `a` tag
      const headline = node;

      // pushes the headline list  in an array
      return items.push(headline);
    });

    //console.log('items', items);
    // const tableItems = items.map(item => {
    //   return {
    //     name: item.value,
    //   };
    // });
    // console.log(tableItems);
  };
};
