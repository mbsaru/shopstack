// components/componentMapper.js
import { FormRenderer } from "./FormRender";
import { Card } from "./card-render";
import ButtonRender from "./ButtonRender";
import Text from "./Text";
import AuthPageLayout from "./FullPageLayout";
import { ProductCard } from "./ProductCard";
import { Div } from "./Div";
import { ProductGrid } from "./ProductGrid";
import Navigation from "./Navigation";
import { NavigationPanel } from "./NavigationPanel";
import SideNavigation from "./SideNavigation";
export const componentMap = {
 FormRenderer,
 Card,
 Text,
 ProductCard,
 Div,
 ProductGrid,
 Navigation,
 NavigationPanel,
 SideNavigation,
 FullPageLayout: AuthPageLayout,
 Button:ButtonRender,
};
