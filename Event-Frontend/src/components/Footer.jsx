function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
