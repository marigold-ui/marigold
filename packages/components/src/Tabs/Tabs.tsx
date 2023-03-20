import React from 'react';
import { useTabList } from '@react-aria/tabs';
import { Box, ThemeExtensionsWithParts, useComponentStyles } from "@marigold/system"
import { useTabListState } from '@react-stately/tabs';
import { useRef } from "react";
import { AriaTabListProps } from '@react-types/tabs';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabContext } from './Context';
import { Item } from '@react-stately/collections';
import { ItemProps } from "@react-types/shared";


export interface TabsThemeExtension extends ThemeExtensionsWithParts<"Tabs", ["tabs", "tab", "tabPanel"]> { }
export interface TabsProps extends Omit<AriaTabListProps<object>, "orientation"> {
    gap?: number,
    size?: "small" | "medium" | "large"
}
export const Tabs: Tabs = ({ gap = 1, size = "medium", ...props }: TabsProps) => {
    const state = useTabListState(props);
    const ref = useRef(null);
    const { tabListProps } = useTabList(props, state, ref);
    const styles = useComponentStyles('Tabs', { size }, { parts: ["tabs", "tab", "tabPanel"] });
    return (
        <TabContext.Provider value={{ styles }}>
            <Box>
                <Box css={styles.tabs} __baseCSS={{ display: "flex", gap: `${gap}rem` }}  {...tabListProps} ref={ref}>
                    {[...state.collection].map((item) => {
                        return (
                            <Tab
                                key={item.key}
                                item={item}
                                state={state}
                            />
                        )
                    }
                    )}
                </Box>
                <TabPanel key={state.selectedItem?.key} state={state} />
            </Box >
        </TabContext.Provider>
    )
}

Tabs.Item = Item

interface Tabs {
    (props: TabsProps): JSX.Element;
    Item: (props: ItemProps<object>) => JSX.Element;
}

