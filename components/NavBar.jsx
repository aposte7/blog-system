import { ChevronDown, Menu, Moon } from 'lucide-react'
import BlogNavLink from './blog/BlogNavLink'

function NavBar() {
	return (
		<nav className="h-16 ">
			<div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-b-border/50 bg-primary-foreground/20 px-8 py-4 backdrop-blur-xl">
				<div className="text-3xl font-medium text-primary">Zemenay</div>

				<input type="checkbox" id="hamburger" className="peer hidden" />

				<div className="sm:backdrop-blur-0 absolute top-full left-0 max-h-0 w-full translate-y-[-10px] bg-background/80 opacity-0 backdrop-blur-xl transition-all duration-500 ease-in-out peer-checked:max-h-[700px] peer-checked:translate-y-0 peer-checked:opacity-100 sm:static sm:flex sm:max-h-full sm:w-auto sm:translate-y-0 sm:overflow-visible sm:bg-transparent sm:opacity-100">
					<ul className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-0">
						<li className="transition-colors duration-200 hover:text-primary">
							<a href="/admin">Home</a>
						</li>
						<li className="transition-colors duration-200 hover:text-primary">
							<a href="#">Project</a>
						</li>

						<li className="">
							<BlogNavLink />
						</li>

						<li className="transition-colors duration-200 hover:text-primary">
							<a href="#">About</a>
						</li>
					</ul>
				</div>

				<div className="flex items-center gap-3">
					<label
						htmlFor="hamburger"
						className="cursor-pointer sm:hidden"
						aria-label="Toggle menu"
					>
						<Menu />
					</label>
					<Moon />
				</div>
			</div>
		</nav>
	)
}

export default NavBar
