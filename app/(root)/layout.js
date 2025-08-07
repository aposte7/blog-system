import {
	ArrowRight,
	BookOpen,
	ChartLine,
	ChevronDown,
	Menu,
	Moon,
	Users,
} from 'lucide-react'
import Image from 'next/image'

const Layout = ({ children }) => {
	return (
		<>
			<header className="bg-blog-gradient-subtle">
				<nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-b-border/50 bg-primary-foreground/20 px-8 py-4 backdrop-blur-xl">
					<div className="text-3xl font-medium text-primary">
						Zemenay
					</div>

					<input
						type="checkbox"
						id="hamburger"
						className="peer hidden"
					/>

					<div className="sm:backdrop-blur-0 absolute top-full left-0 max-h-0 w-full translate-y-[-10px] bg-background/80 opacity-0 backdrop-blur-xl transition-all duration-500 ease-in-out peer-checked:max-h-[700px] peer-checked:translate-y-0 peer-checked:opacity-100 sm:static sm:flex sm:max-h-full sm:w-auto sm:translate-y-0 sm:overflow-visible sm:bg-transparent sm:opacity-100">
						<ul className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-0">
							<li className="transition-colors duration-200 hover:text-primary">
								<a href="/admin">Home</a>
							</li>
							<li className="transition-colors duration-200 hover:text-primary">
								<a href="#">Project</a>
							</li>

							<li className="group relative">
								<div className="flex cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-primary">
									Blog
									<ChevronDown size={16} />
								</div>

								<div className="invisible absolute -top-full left-20 z-50 mt-2 w-64 rounded-md border border-border bg-background p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 sm:top-full sm:left-0">
									<input
										type="text"
										placeholder="Search blog..."
										className="mb-3 w-full rounded-md border  border-border px-3 py-2 text-sm focus:ring-1
                                        focus:ring-offset-1 focus:ring-ring focus:outline-none"
									/>

									<ul className="space-y-2">
										<li>
											<a
												href="/blog/categories"
												className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
											>
												Categories
											</a>
										</li>
										<li>
											<a
												href="/blog/recent"
												className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
											>
												Recent Articles
											</a>
										</li>
										<li>
											<a
												href="/blog/recent"
												className="block py-1 text-sm text-muted-foreground hover:text-primary-hover hover:underline"
											>
												All Articles
											</a>
										</li>
									</ul>
								</div>
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
				</nav>

				<div className="hero mt-10 grid items-center gap-8 px-5 pt-36 pb-24 lg:grid-cols-2 lg:px-10 xl:px-20">
					<div className="hero-text space-y-8">
						<p className="inline-flex bg-bl rounded-full border border-primary/40 bg-primary/10 px-3 py-px text-sm font-medium text-primary md:text-base">
							Welcome to Blogosphere
						</p>

						<h1 className="text-5xl text-foreground font-bold xl:text-6xl">
							Discover Amazing{' '}
							<span className="text-primary">Stories</span>
						</h1>

						<p className="max-w-[32rem] text-lg text-muted-foreground md:text-xl">
							Explore insightful articles on technology, design,
							business, and lifestyle. Join our community of
							passionate readers and writers.
						</p>
						<div className="hero-icon flex items-center gap-10">
							<div className="flex items-center gap-3 text-base md:text-lg lg:gap-5 lg:text-2xl">
								<BookOpen
									size="1.2em"
									className="text-primary"
								/>
								<div>
									<p className="font-medium">144</p>
									<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
										Articles
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 text-base md:text-lg lg:text-2xl">
								<Users size="1.2em" className="text-primary" />
								<div>
									<p className="font-medium">1.2K</p>
									<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
										Readers
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 text-base md:text-lg lg:text-2xl">
								<ChartLine
									size="1.2em"
									className="text-primary"
								/>
								<div>
									<p className="font-medium">14.7K</p>
									<p className="text-sm text-muted-foreground md:text-base lg:text-lg">
										Views
									</p>
								</div>
							</div>
						</div>

						<div className="hero-button flex flex-col gap-10 sm:flex-row">
							<button className="inline-flex items-center justify-center gap-5 rounded-lg bg-blog-gradient px-8 py-3 text-center text-base font-medium text-primary-foreground">
								<span>Start Reading</span>{' '}
								<ArrowRight size="1.1em" />
							</button>
							<button
								className="bg-muted l inline-flex justify-center gap-5 rounded-lg border border-primary/10 hover:bg-primary/80 
                            hover:text-primary-foreground
                            px-8 py-3 text-center text-base font-medium text-black"
							>
								<span>Browse Categories </span>
							</button>
						</div>
					</div>

					<div className="hero-image h-[32rem] overflow-hidden rounded-lg bg-amber-500">
						<Image
							src="/600x400.svg"
							alt=""
							width={100}
							height={100}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			</header>
			<main className=""></main>
		</>
	)
}

export default Layout
