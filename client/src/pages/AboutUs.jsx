import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">About Jayasinghe Storelines</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Founded in 1985, Jayasinghe Storelines has grown from a small family business to one of Sri Lanka's leading retailers of electronics and furniture. For over three decades, we have been committed to providing our customers with exceptional products, competitive prices, and outstanding service.
        </p>
        <p>
          What started as a modest shop in Colombo has expanded to multiple locations across Sri Lanka, serving thousands of satisfied customers. Our growth is a testament to our unwavering dedication to quality and customer satisfaction.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          At Jayasinghe Storelines, our mission is to enhance the quality of life for our customers by offering innovative, high-quality products at competitive prices. We strive to create a shopping experience that is convenient, enjoyable, and tailored to meet the unique needs of each customer.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Customer Focus</h3>
            <p>We put our customers at the center of everything we do, listening to their needs and continuously improving our offerings.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Quality</h3>
            <p>We are committed to offering only the highest quality products that meet our rigorous standards for durability and performance.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Integrity</h3>
            <p>We conduct our business with honesty, transparency, and ethical practices, building trust with our customers and partners.</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="mb-4">
          Our diverse team of professionals brings together a wealth of experience and expertise in retail, customer service, and product knowledge. We are united by our passion for delivering exceptional service and our commitment to the company's values.
        </p>
        <p>
          From our sales consultants who help you find the perfect product to our delivery and installation teams who ensure a seamless experience, every member of our team is dedicated to your satisfaction.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;