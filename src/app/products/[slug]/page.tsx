import Image from "next/image";
import React from "react";

const baseurl = process.env.BASEURL_API;

const getData = async (id: String) => {
  const res = await fetch(`${baseurl}${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return "Couldn't Fetch Data from Server";
  return res.json();
};

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const mappeddata = await getData(slug);
  const data = [mappeddata];

  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <div className="p-16 w-full mt-16">
        <div>
          {!data ? (
            <p>Loading data......</p>
          ) : (
            data.map((item, i) => {
              return (
                <div
                  key={i}
                  className="my-4"
                >
                  <h1 className="text-5xl text-center p-8">{item.title}</h1>
                  <div className="my-4 flex justify-center">
                    {item.image
                      ? item.image.map(
                          (
                            item: string,
                            index: React.Key | null | undefined
                          ) => {
                            return (
                              <Image
                                key={index}
                                src={item}
                                width={800}
                                height={700}
                                alt="Popular Advert"
                              />
                            );
                          }
                        )
                      : "No Image to display"}
                  </div>
                  <div className="flex justify-between text-center">
                    <p>{item.desc}</p>
                  </div>
                  <div className="max-w-[80%] flex justify-between items-center my-6">
                    <h3 className="bold text-2xl p-4">Interested?</h3>
                    <p>
                      <span className="text-xl p-4">Contact Us at:</span>
                      <span className="text-xl p-4">
                        <a href="tel:+23423-456-7890">Contact on call</a>
                      </span>
                      <span className="text-xl p-4">
                        <label>Email: </label>
                        <a
                          href="mailto:Email: farmdirect@mail.com"
                          target="_blank"
                        >
                          Contact at Farm Direct
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
