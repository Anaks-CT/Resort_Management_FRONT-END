import SingleFaq from "./SingleFaq";

type props = {
  faqs?: {
    _id: string;
    Q: String;
    A: String;
  }[];
};

function FAQ({ faqs }: props) {
  const singleFaq = faqs?.map((item) => <SingleFaq key={item._id} faq={item} />);

  return (
    <div className="flex flex-col items-center pb-20 md:px-36 lg:px-44 px-8">
      <h1>FAQ</h1>
      {singleFaq}
    </div>
  );
}

export default FAQ;
