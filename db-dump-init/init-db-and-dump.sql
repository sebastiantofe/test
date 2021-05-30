--
-- PostgreSQL database dump
--
  CREATE DATABASE test;
-- Dumped from database version 12.7
-- Dumped by pg_dump version 12.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    description character varying(30) NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(30) NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    products_id uuid,
    qty integer NOT NULL,
    sale_at timestamp without time zone DEFAULT now(),
    users_id uuid
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    document character varying(20) NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    last_name character varying(30) NOT NULL,
    name character varying(30) NOT NULL,
    roles_id uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (description, id, name, price) FROM stdin;
Libra	479fba0a-baaf-4b46-95a2-83a663817646	Arroz	3000
Libra	efbff7f6-6374-4c2f-9c96-3611c65068ba	Papas	1000
500 ml	f7c377cf-0f92-435a-b5e6-2c8cdd9d10c6	Agua sin gas	2000
500 ml	3bed5d90-64ed-4bc1-8a3a-a378737ed542	Agua con gas	2500
ministro de haciendo aprueba	c3f25f98-c5c3-4a00-b550-f716ae36b25f	Docena de huevos	1800
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
06232ca5-0e79-420b-9c02-5d437398981e	admin
66b791f6-e72e-410c-a8ab-2c4c4655840b	employee
d720245b-8a93-4669-be7a-c62642eb1a30	user
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id, products_id, qty, sale_at, users_id) FROM stdin;
54ac3872-d98e-4107-bdf6-9e495c8029b2	c3f25f98-c5c3-4a00-b550-f716ae36b25f	10	2021-05-29 23:43:05.69019	422efd39-22c0-4587-a625-78ca96de6280
67131230-8e32-4dbb-8c1b-fa5e54fe1264	c3f25f98-c5c3-4a00-b550-f716ae36b25f	1	2021-05-30 03:25:50.436786	422efd39-22c0-4587-a625-78ca96de6280
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (document, id, last_name, name, roles_id) FROM stdin;
1010101010	422efd39-22c0-4587-a625-78ca96de6280	Torrado	Sebastian	06232ca5-0e79-420b-9c02-5d437398981e
111111111111	cf6d6032-d24d-4351-a98f-f90ab9c0a9d7	Doe	John	66b791f6-e72e-410c-a8ab-2c4c4655840b
111111111111d	09ca4a8b-3ecd-489a-97f0-f125bcf5d141	Doe	John	66b791f6-e72e-410c-a8ab-2c4c4655840b
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: roles uniq_role_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT uniq_role_name UNIQUE (name);


--
-- Name: users users_document_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_document_key UNIQUE (document);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sales sales_products_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_products_id_fkey FOREIGN KEY (products_id) REFERENCES public.products(id);


--
-- Name: sales sales_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: users users_roles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_id_fkey FOREIGN KEY (roles_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

