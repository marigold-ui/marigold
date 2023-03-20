import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Tabs } from './Tabs';


const theme = {
    colors: {
        orange: "#fa8005",
        gray: "#8d8d8d",
    },
    space: {
        none: 0,
        small: 0.25,
        medium: "0 0.5rem 0.5rem",
        large: 1
    },
    components: {
        Tabs: {
            base: {
                tab: {
                    borderBottom: "8px solid orange",
                    "&[aria-selected=false]:not([aria-disabled=true]):hover": {
                        color: "orange",
                    },
                },
            },
            size: {
                medium: {
                    tab: {
                        padding: "medium"
                    }
                }
            }
        },
    },


}

test('rendering content correctly', () => {
    render(
        <Tabs>
            <Tabs.Item title="tab1" key={1}>
                tab-1 content
            </Tabs.Item>
            <Tabs.Item title="tab2" key={2}>
                tab-2 content
            </Tabs.Item>
            <Tabs.Item title="tab3" key={3}>
                tab-3 content
            </Tabs.Item>
        </Tabs>
    );

    // rendering the tab controller
    expect(screen.getByText("tab1")).toBeInTheDocument();
    // rendering tabpanel 
    expect(screen.getByText(/tab-1/)).toBeInTheDocument();

});

test("Supporting default size", () => {
    render(
        <ThemeProvider theme={theme}>
            <Tabs>
                <Tabs.Item key={1} title="tab">
                    tab content
                </Tabs.Item>
            </Tabs>
        </ThemeProvider>
    )
    expect(screen.getByText("tab")).toHaveStyle(`padding:0 0.5rem 0.5rem`)
}
)

test("supports disabled prop", () => {
    render(
        <Tabs disabledKeys={["2"]}>
            <Tabs.Item title="tab1" key={1}>
                tab-1 content
            </Tabs.Item>
            <Tabs.Item title="tab2" key={2}>
                tab-2 content
            </Tabs.Item>
        </Tabs>
    )
    const tab = screen.getByText("tab2");
    expect(tab).toHaveAttribute("aria-disabled");
    fireEvent.click(tab);
    expect(screen.getByText("tab-1 content")).toBeVisible();
})

test("set defaultValue via props in tabs", () => {
    render(
        <Tabs defaultSelectedKey={"2"}>
            <Tabs.Item key={1} title="tab1">
                tab-1 content
            </Tabs.Item>
            <Tabs.Item key={2} title="tab2">
                tab-2 content
            </Tabs.Item>
        </Tabs>
    )
    expect(screen.getByText("tab-2 content")).toBeVisible();
})


test("cursor indicates interactivity", () => {
    render(
        <Tabs disabledKeys={["2"]}>
            <Tabs.Item key="1" title={"tab1"}>
                tab-1 content
            </Tabs.Item>
            <Tabs.Item key="2" title={"tab2"}>
                tab-2 content
            </Tabs.Item>
        </Tabs>
    )
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveStyle("cursor: pointer");
    expect(tabs[1]).toHaveStyle("cursor: not-allowed");
})


test("open tabpanel when its tab controller is clicked", () => {
    render(
        <ThemeProvider theme={theme}>
            <Tabs>
                <Tabs.Item title="tab1" key="1">
                    tab-1 content
                </Tabs.Item>
                <Tabs.Item title="tab2" key="2">
                    tab-2 content
                </Tabs.Item>
            </Tabs>
        </ThemeProvider>
    )
    const tab = screen.getByText("tab2");
    fireEvent.click(tab);
    expect(tab).toHaveStyle("border-bottom: 8px solid orange");
    expect(screen.getByText("tab-2 content")).toBeVisible();
});


