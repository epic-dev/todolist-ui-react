import styled from "styled-components";

interface IFlexContainerStyles {
    readonly $width?: number;
    readonly $direction?: string;
    readonly $alignSelf?: "center" | "start" | "end";
    readonly $alignItems?: "center" | "start" | "end";
    readonly $justifyContent?: "center" | "start" | "end";
    readonly $padding?: string; // TODO: create appropriate type
    readonly $margin?: string; // TODO: create appropriate type
}

export const FlexContainer = styled.div<IFlexContainerStyles>`
    display: flex;
    width: ${props => props.$width ? `${props.$width}px` : null};
    flex-direction: ${props => props.$direction};
    align-self: ${props => props.$alignSelf};
    align-items: ${props => props.$alignItems};
    justify-content: ${props => props.$justifyContent};
    padding: ${props => props.$padding};
    margin: ${props => props.$margin};
`;