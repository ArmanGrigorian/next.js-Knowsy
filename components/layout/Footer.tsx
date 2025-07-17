function Footer() {
  return (
    <footer className="h-20 leading-[80px] bg-neutral-900 flex items-center justify-center flex-col gap-2">
      <small className="text-center text-neutral-100">
        Powered by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href={"https://github.com/ArmanGrigorian?tab=repositories"}
          className="underline decoration-neutral-100 underline-offset-2">
          Me
        </a>
      </small>
    </footer>
  );
}

export default Footer;
