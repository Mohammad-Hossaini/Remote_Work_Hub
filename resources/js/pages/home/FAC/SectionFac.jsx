import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./SectionFac.css";

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
    <section className="accordion">
      {data.map((item, index) => (
        <div
          key={index}
          className={`item ${openIndex === index ? "open" : ""}`}
        >
          <p className="number">{item.number}</p>
          <p className="text">{item.question}</p>
          <span className="icon" onClick={() => toggleAccordion(index)}>
            <FaChevronDown />
          </span>

          <div className={`hidden-box ${openIndex === index ? "open" : ""}`}>
            <p>{item.answer}</p>
            <ul>
              {item.list.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
