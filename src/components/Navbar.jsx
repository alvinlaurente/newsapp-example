import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
		<Link to="/">
			<div className="px-4 w-full h-12 flex flex-row justify-items-center items-center bg-[#a790a7]">
				<p className="font-bold text-xl">React News</p>
			</div>
		</Link>
  );
};

export default Navbar;
