import styled, { css } from "styled-components";

const sizes = {
    small: css`
        font-size: 1.4rem;
        padding: var(--space-8) var(--space-16);
        font-weight: 600;
        text-transform: uppercase;
    `,
    medium: css`
        font-size: 1.6rem;
        padding: var(--space-12) var(--space-24);
        font-weight: 500;
    `,
    large: css`
        font-size: 1.8rem;
        padding: var(--space-16) var(--space-32);
        font-weight: 500;
    `,
};

const variations = {
    primary: css`
        color: #fff;
        background-color: var(--color-primary);

        &:hover:not(:disabled) {
            background-color: var(--color-primary-dark);
        }
    `,
    secondary: css`
        color: var(--color-grey-700);
        background: var(--color-grey-0);
        border: 1px solid var(--color-grey-200);

        &:hover:not(:disabled) {
            background-color: var(--color-grey-50);
        }
    `,
    danger: css`
        color: #fff;
        background-color: var(--color-error);

        &:hover:not(:disabled) {
            background-color: #991b1b; /* darker red */
        }
    `,
};

const Button = styled.button`
    border: none;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: all 0.2s ease;

    ${(props) => sizes[props.size]}
    ${(props) => variations[props.variation]}

  ${(props) =>
        props.$full &&
        css`
            width: 100%;
            display: block;
        `}

  &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        box-shadow: none;
    }
`;

Button.defaultProps = {
    variation: "primary",
    size: "medium",
};

export default Button;
