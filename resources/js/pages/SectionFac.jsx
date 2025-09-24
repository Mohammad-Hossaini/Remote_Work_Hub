// SectionFac.jsx
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";

const AccordionWrapper = styled.section`
    max-width: 100rem;
    margin: 9.6rem auto;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    font-family: "Inter", sans-serif;
`;

const AccordionItem = styled.div`
    box-shadow: 0 0 2.4rem rgba(0, 0, 0, 0.1);
    padding: 1.4rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    border-radius: 0.5rem;
    position: relative;
    background: #fff;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-0.3rem);
        box-shadow: 0 0 4rem rgba(0, 0, 0, 0.12);
    }
`;

const Number = styled.p`
    font-weight: 500;
    font-size: 2.4rem;
    color: #ced4da;
`;

const Text = styled.p`
    font-weight: 500;
    font-size: 2.4rem;
    margin-left: 2.5rem;
`;

const Icon = styled.span`
    font-size: 2rem;
    color: #087f5b;
    transition: transform 0.3s ease;

    &.open {
        transform: rotate(180deg);
    }
`;

const HiddenBox = styled.div`
    grid-column: 2 / 3;
    overflow: hidden;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    transition: max-height 0.5s ease, padding 0.5s ease;

    &.open {
        max-height: 50rem;
        padding-top: 1.6rem;
        padding-bottom: 1.6rem;
    }

    p {
        font-size: 1.6rem;
        line-height: 1.6;
        margin-bottom: 1.6rem;
        color: #343a40;
    }

    ul {
        color: #868e96;
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        font-size: 1.6rem;
    }
`;

export default function SectionFac() {
    const [openIndex, setOpenIndex] = useState(1);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const data = [
        {
            number: "01",
            question: "Where are these chairs assembled?",
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, est
        corrupti doloremque id dolore adipisci magni. Voluptate sequi sit,
        laudantium dolore quasi similique voluptatibus numquam modi,
        corrupti, nihil nisi consectetur.`,
            list: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Voluptate sequi sit, laudantium dolore quasi similique.",
                "Quas, recusandae nihil provident vitae assumenda sequi quibusdam",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit assumenda.",
            ],
        },
        {
            number: "02",
            question: "How long do I have to return my chair?",
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, est
        corrupti doloremque id dolore adipisci magni. Voluptate sequi sit,
        laudantium dolore quasi similique voluptatibus numquam modi,
        corrupti, nihil nisi consectetur.`,
            list: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Voluptate sequi sit, laudantium dolore quasi similique.",
                "Quas, recusandae nihil provident vitae assumenda sequi quibusdam",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit assumenda.",
            ],
        },
        {
            number: "03",
            question: "Do you ship to countries outside the EU?",
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, est
        corrupti doloremque id dolore adipisci magni. Voluptate sequi sit,
        laudantium dolore quasi similique voluptatibus numquam modi,
        corrupti, nihil nisi consectetur.`,
            list: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Voluptate sequi sit, laudantium dolore quasi similique.",
                "Quas, recusandae nihil provident vitae assumenda sequi quibusdam",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit assumenda.",
            ],
        },
        {
            number: "04",
            question: "Do you ship to countries outside the EU?",
            answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, est
        corrupti doloremque id dolore adipisci magni. Voluptate sequi sit,
        laudantium dolore quasi similique voluptatibus numquam modi,
        corrupti, nihil nisi consectetur.`,
            list: [
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "Voluptate sequi sit, laudantium dolore quasi similique.",
                "Quas, recusandae nihil provident vitae assumenda sequi quibusdam",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit assumenda.",
            ],
        },
    ];

    return (
        <AccordionWrapper>
            {data.map((item, index) => (
                <AccordionItem key={index}>
                    <Number>{item.number}</Number>
                    <Text>{item.question}</Text>
                    <Icon
                        className={openIndex === index ? "open" : ""}
                        onClick={() => toggleAccordion(index)}
                    >
                        <FaChevronDown />
                    </Icon>

                    <HiddenBox className={openIndex === index ? "open" : ""}>
                        <p>{item.answer}</p>
                        <ul>
                            {item.list.map((li, i) => (
                                <li key={i}>{li}</li>
                            ))}
                        </ul>
                    </HiddenBox>
                </AccordionItem>
            ))}
        </AccordionWrapper>
    );
}
