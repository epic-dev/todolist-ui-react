import styled from "styled-components";

interface IFlexItem {
    readonly $flex?: string | number;
    readonly $padding?: string | number;
    readonly $margin?: string | number;
}
export const FlexItem = styled.div<IFlexItem>`
    flex: ${props => props.$flex};
    padding: ${(props) => {
        if (typeof props.$padding === 'number') {
            return String(props.$padding) + 'px';
        }
        return props.$padding;
    }};
    margin: ${(props) => {
        if (typeof props.$margin === 'number') {
            return String(props.$margin) + 'px';
        }
        return props.$margin;
    }};
`;