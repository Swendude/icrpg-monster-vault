import Icon from "@/icons/Icon";

const Header = () => (
  <section className="outline-b-2 flex items-center border-b-2 border-dashed border-dark bg-red p-4">
    <Icon
      variant="Dice Skull"
      className="inline-block w-4 [&>path]:fill-white"
    />
    <h1 className="pl-4 font-hand md:text-xl">ICRPG MONSTER VAULT</h1>
  </section>
);

export default Header;
