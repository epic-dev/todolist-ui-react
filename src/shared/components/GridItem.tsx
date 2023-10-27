import styled from "styled-components";

interface IGridItem {
    readonly $column?: string;
    readonly $row?: string;
    readonly $padding?: string | number;
}
export const GridItem = styled.div<IGridItem>`
    grid-column: ${props => props.$column};
    grid-row: ${props => props.$row};
    padding: ${props => {
        if (typeof props.$padding === 'number') {
            return `${props.$padding}px`;
        }
        return props.$padding;
    }};
`;