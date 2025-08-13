-- Profiles table
CREATE TABLE public.profiles (
    id uuid NOT NULL,
    name text NULL,
    email text NULL,
    company_role text NULL,
    avatar text NULL,
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_email_key UNIQUE (email),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Categories table
CREATE TABLE public.categories (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL,
    description text NULL,
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
    color text NULL DEFAULT '#333',
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_name_key UNIQUE (name),
    CONSTRAINT categories_slug_key UNIQUE (slug)
) TABLESPACE pg_default;

-- Tags table
CREATE TABLE public.tags (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL,
    description text NULL,
    color text NULL DEFAULT '#333',
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT tags_pkey PRIMARY KEY (id),
    CONSTRAINT tags_name_key UNIQUE (name),
    CONSTRAINT tags_slug_key UNIQUE (slug)
) TABLESPACE pg_default;

-- Posts table
CREATE TABLE public.posts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    excerpt text NULL,
    featured_image text NULL,
    featured boolean NULL DEFAULT false,
    read_time integer NOT NULL DEFAULT 3 CHECK (read_time > 0),
    status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
    views integer NOT NULL DEFAULT 0,
    published_at timestamptz NULL,
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    author_id uuid NOT NULL,
    category_id uuid NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_slug_key UNIQUE (slug),
    CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles(id),
    CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Post tags junction table
CREATE TABLE public.post_tags (
    post_id uuid NOT NULL,
    tag_id uuid NOT NULL,
    CONSTRAINT post_tags_pkey PRIMARY KEY (post_id, tag_id),
    CONSTRAINT post_tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT post_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Media table
CREATE TABLE public.media (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    image_url text NOT NULL,
    alt_text text NULL,
    uploaded_by uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT media_pkey PRIMARY KEY (id),
    CONSTRAINT media_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES auth.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Post media junction table
CREATE TABLE public.post_media (
    post_id uuid NOT NULL,
    media_id uuid NOT NULL,
    CONSTRAINT post_media_pkey PRIMARY KEY (post_id, media_id),
    CONSTRAINT post_media_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT post_media_media_id_fkey FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Comments table
CREATE TABLE public.comments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    content text NOT NULL,
    author_name text NOT NULL,
    author_email text NOT NULL,
    post_id uuid NOT NULL,
    parent_id uuid NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','spam')),
    created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
) TABLESPACE pg_default;
