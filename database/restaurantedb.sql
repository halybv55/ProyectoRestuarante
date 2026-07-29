--
-- PostgreSQL database dump
--

\restrict zC2aEs11gCeaYdJOzug27W1owlYpcNL9mcj4K6p9rCxnYnDIfAtXosJJpxLpn7c

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-07-25 19:21:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 73958)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5380 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 73996)
-- Name: bebida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bebida (
    idbebida bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    tipo_bebida character varying(80) NOT NULL,
    nombre character varying(80) NOT NULL,
    precio numeric(10,2) NOT NULL,
    stock_total integer NOT NULL,
    stock_disponible integer NOT NULL,
    stock_minimo integer NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    CONSTRAINT chk_bebida_precio CHECK ((precio >= (0)::numeric)),
    CONSTRAINT chk_bebida_stock_disponible CHECK ((stock_disponible >= 0)),
    CONSTRAINT chk_bebida_stock_minimo CHECK ((stock_minimo >= 0)),
    CONSTRAINT chk_bebida_stock_total CHECK ((stock_total >= 0))
);


ALTER TABLE public.bebida OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 74014)
-- Name: bebida_idbebida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bebida_idbebida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bebida_idbebida_seq OWNER TO postgres;

--
-- TOC entry 5381 (class 0 OID 0)
-- Dependencies: 221
-- Name: bebida_idbebida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bebida_idbebida_seq OWNED BY public.bebida.idbebida;


--
-- TOC entry 222 (class 1259 OID 74015)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    idcategoria bigint NOT NULL,
    codigo_categoria uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(150),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 74024)
-- Name: categoria_idcategoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_idcategoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_idcategoria_seq OWNER TO postgres;

--
-- TOC entry 5382 (class 0 OID 0)
-- Dependencies: 223
-- Name: categoria_idcategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_idcategoria_seq OWNED BY public.categoria.idcategoria;


--
-- TOC entry 224 (class 1259 OID 74025)
-- Name: combo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.combo (
    idcombo bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    idmenu bigint,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone,
    fecha_eliminacion timestamp without time zone,
    CONSTRAINT chk_combo_precio CHECK ((precio >= (0)::numeric))
);


ALTER TABLE public.combo OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 74037)
-- Name: combo_idcombo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.combo_idcombo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.combo_idcombo_seq OWNER TO postgres;

--
-- TOC entry 5383 (class 0 OID 0)
-- Dependencies: 225
-- Name: combo_idcombo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.combo_idcombo_seq OWNED BY public.combo.idcombo;


--
-- TOC entry 226 (class 1259 OID 74038)
-- Name: compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compra (
    idcompra bigint NOT NULL,
    descripcion text,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    total numeric(10,2) NOT NULL,
    fecha timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idusuario bigint NOT NULL,
    idtipocompra bigint NOT NULL,
    CONSTRAINT chk_compra_total CHECK ((total >= (0)::numeric))
);


ALTER TABLE public.compra OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 74054)
-- Name: compra_idcompra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compra_idcompra_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compra_idcompra_seq OWNER TO postgres;

--
-- TOC entry 5384 (class 0 OID 0)
-- Dependencies: 227
-- Name: compra_idcompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compra_idcompra_seq OWNED BY public.compra.idcompra;


--
-- TOC entry 228 (class 1259 OID 74055)
-- Name: configuracionrestaurante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracionrestaurante (
    idconfiguracion bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    direccion character varying(150),
    telefono character varying(50),
    logo text
);


ALTER TABLE public.configuracionrestaurante OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 74062)
-- Name: configuracionrestaurante_idconfiguracion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.configuracionrestaurante_idconfiguracion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuracionrestaurante_idconfiguracion_seq OWNER TO postgres;

--
-- TOC entry 5385 (class 0 OID 0)
-- Dependencies: 229
-- Name: configuracionrestaurante_idconfiguracion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracionrestaurante_idconfiguracion_seq OWNED BY public.configuracionrestaurante.idconfiguracion;


--
-- TOC entry 230 (class 1259 OID 74063)
-- Name: detallecombo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallecombo (
    iddetallecombo bigint NOT NULL,
    cantidad integer NOT NULL,
    idcombo bigint NOT NULL,
    idplato bigint NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone,
    fecha_eliminacion timestamp without time zone,
    CONSTRAINT chk_detallecombo_cantidad CHECK ((cantidad > 0))
);


ALTER TABLE public.detallecombo OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 74074)
-- Name: detallecombo_iddetallecombo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallecombo_iddetallecombo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallecombo_iddetallecombo_seq OWNER TO postgres;

--
-- TOC entry 5386 (class 0 OID 0)
-- Dependencies: 231
-- Name: detallecombo_iddetallecombo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallecombo_iddetallecombo_seq OWNED BY public.detallecombo.iddetallecombo;


--
-- TOC entry 232 (class 1259 OID 74075)
-- Name: detallecompra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallecompra (
    iddetalle_compra bigint NOT NULL,
    cantidad numeric(10,2) NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    idcompra bigint NOT NULL,
    idproducto bigint NOT NULL,
    CONSTRAINT chk_detallecompra_cantidad CHECK ((cantidad > (0)::numeric)),
    CONSTRAINT chk_detallecompra_precio CHECK ((precio_unitario >= (0)::numeric)),
    CONSTRAINT chk_detallecompra_subtotal CHECK ((subtotal >= (0)::numeric))
);


ALTER TABLE public.detallecompra OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 74087)
-- Name: detallecompra_iddetalle_compra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallecompra_iddetalle_compra_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallecompra_iddetalle_compra_seq OWNER TO postgres;

--
-- TOC entry 5387 (class 0 OID 0)
-- Dependencies: 233
-- Name: detallecompra_iddetalle_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallecompra_iddetalle_compra_seq OWNED BY public.detallecompra.iddetalle_compra;


--
-- TOC entry 234 (class 1259 OID 74088)
-- Name: detallemenu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallemenu (
    iddetalle_menu bigint NOT NULL,
    stock integer,
    activo boolean DEFAULT true NOT NULL,
    idmenu bigint NOT NULL,
    idplato bigint NOT NULL,
    CONSTRAINT chk_detallemenu_stock CHECK ((stock >= 0))
);


ALTER TABLE public.detallemenu OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 74097)
-- Name: detallemenu_iddetalle_menu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallemenu_iddetalle_menu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallemenu_iddetalle_menu_seq OWNER TO postgres;

--
-- TOC entry 5388 (class 0 OID 0)
-- Dependencies: 235
-- Name: detallemenu_iddetalle_menu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallemenu_iddetalle_menu_seq OWNED BY public.detallemenu.iddetalle_menu;


--
-- TOC entry 236 (class 1259 OID 74098)
-- Name: detallepedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallepedido (
    iddetalle bigint NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    observacion character varying(255),
    activo boolean DEFAULT true NOT NULL,
    idpedido bigint NOT NULL,
    idplato bigint,
    idbebida bigint,
    idestadopedido bigint,
    CONSTRAINT chk_detalle_cantidad CHECK ((cantidad > 0)),
    CONSTRAINT chk_detalle_precio CHECK ((precio_unitario >= (0)::numeric)),
    CONSTRAINT chk_detalle_subtotal CHECK ((subtotal >= (0)::numeric))
);


ALTER TABLE public.detallepedido OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 74111)
-- Name: detallepedido_iddetalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallepedido_iddetalle_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallepedido_iddetalle_seq OWNER TO postgres;

--
-- TOC entry 5389 (class 0 OID 0)
-- Dependencies: 237
-- Name: detallepedido_iddetalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallepedido_iddetalle_seq OWNED BY public.detallepedido.iddetalle;


--
-- TOC entry 238 (class 1259 OID 74112)
-- Name: estadopedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadopedido (
    idestado bigint NOT NULL,
    nombre character varying(40) NOT NULL,
    descripcion character varying(120)
);


ALTER TABLE public.estadopedido OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 74117)
-- Name: estadopedido_idestado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estadopedido_idestado_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estadopedido_idestado_seq OWNER TO postgres;

--
-- TOC entry 5390 (class 0 OID 0)
-- Dependencies: 239
-- Name: estadopedido_idestado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estadopedido_idestado_seq OWNED BY public.estadopedido.idestado;


--
-- TOC entry 240 (class 1259 OID 74118)
-- Name: gastoextra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gastoextra (
    idgasto bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    descripcion text,
    fecha timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    monto numeric(10,2) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    idusuario bigint NOT NULL,
    CONSTRAINT chk_gasto_monto CHECK ((monto >= (0)::numeric))
);


ALTER TABLE public.gastoextra OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 74133)
-- Name: gastoextra_idgasto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gastoextra_idgasto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gastoextra_idgasto_seq OWNER TO postgres;

--
-- TOC entry 5391 (class 0 OID 0)
-- Dependencies: 241
-- Name: gastoextra_idgasto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gastoextra_idgasto_seq OWNED BY public.gastoextra.idgasto;


--
-- TOC entry 242 (class 1259 OID 74134)
-- Name: menu_dia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_dia (
    idmenu bigint NOT NULL,
    fecha date NOT NULL,
    estado character varying(50) NOT NULL,
    codigo_menu uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.menu_dia OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 74142)
-- Name: menu_dia_idmenu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_dia_idmenu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_dia_idmenu_seq OWNER TO postgres;

--
-- TOC entry 5392 (class 0 OID 0)
-- Dependencies: 243
-- Name: menu_dia_idmenu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_dia_idmenu_seq OWNED BY public.menu_dia.idmenu;


--
-- TOC entry 244 (class 1259 OID 74143)
-- Name: mesa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mesa (
    idmesa bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    numero integer NOT NULL,
    capacidad integer NOT NULL,
    disponible boolean DEFAULT true NOT NULL,
    CONSTRAINT chk_capacidad CHECK ((capacidad > 0))
);


ALTER TABLE public.mesa OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 74154)
-- Name: mesa_idmesa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesa_idmesa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesa_idmesa_seq OWNER TO postgres;

--
-- TOC entry 5393 (class 0 OID 0)
-- Dependencies: 245
-- Name: mesa_idmesa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesa_idmesa_seq OWNED BY public.mesa.idmesa;


--
-- TOC entry 246 (class 1259 OID 74155)
-- Name: metodopago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metodopago (
    idmetodopago bigint NOT NULL,
    nombre character varying(40) NOT NULL,
    descripcion character varying(120),
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.metodopago OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 74162)
-- Name: metodopago_idmetodopago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metodopago_idmetodopago_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metodopago_idmetodopago_seq OWNER TO postgres;

--
-- TOC entry 5394 (class 0 OID 0)
-- Dependencies: 247
-- Name: metodopago_idmetodopago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodopago_idmetodopago_seq OWNED BY public.metodopago.idmetodopago;


--
-- TOC entry 248 (class 1259 OID 74163)
-- Name: modificacionpedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modificacionpedido (
    idmodificacion bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    fecha timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    tipo_modificacion character varying(50) NOT NULL,
    idpedido bigint NOT NULL,
    iddetalle bigint,
    idusuario bigint NOT NULL
);


ALTER TABLE public.modificacionpedido OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 74178)
-- Name: modificacionpedido_idmodificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modificacionpedido_idmodificacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modificacionpedido_idmodificacion_seq OWNER TO postgres;

--
-- TOC entry 5395 (class 0 OID 0)
-- Dependencies: 249
-- Name: modificacionpedido_idmodificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modificacionpedido_idmodificacion_seq OWNED BY public.modificacionpedido.idmodificacion;


--
-- TOC entry 250 (class 1259 OID 74179)
-- Name: pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido (
    idpedido bigint NOT NULL,
    tipo_pedido character varying(50) NOT NULL,
    fecha_hora timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total numeric(10,2) NOT NULL,
    idusuario bigint NOT NULL,
    idmesa bigint,
    codigo_pedido uuid DEFAULT gen_random_uuid() NOT NULL,
    idestado bigint NOT NULL,
    CONSTRAINT chk_pedido_total CHECK ((total >= (0)::numeric))
);


ALTER TABLE public.pedido OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 74192)
-- Name: pedido_idpedido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_idpedido_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedido_idpedido_seq OWNER TO postgres;

--
-- TOC entry 5396 (class 0 OID 0)
-- Dependencies: 251
-- Name: pedido_idpedido_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_idpedido_seq OWNED BY public.pedido.idpedido;


--
-- TOC entry 252 (class 1259 OID 74193)
-- Name: plato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plato (
    idplato bigint NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp with time zone,
    fecha_eliminacion timestamp with time zone,
    idcategoria bigint NOT NULL,
    CONSTRAINT chk_plato_precio CHECK ((precio >= (0)::numeric))
);


ALTER TABLE public.plato OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 74206)
-- Name: plato_idplato_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plato_idplato_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plato_idplato_seq OWNER TO postgres;

--
-- TOC entry 5397 (class 0 OID 0)
-- Dependencies: 253
-- Name: plato_idplato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plato_idplato_seq OWNED BY public.plato.idplato;


--
-- TOC entry 254 (class 1259 OID 74207)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    idproducto bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 74218)
-- Name: producto_idproducto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_idproducto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_idproducto_seq OWNER TO postgres;

--
-- TOC entry 5398 (class 0 OID 0)
-- Dependencies: 255
-- Name: producto_idproducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_idproducto_seq OWNED BY public.producto.idproducto;


--
-- TOC entry 256 (class 1259 OID 74219)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    idrol bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(150)
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 74226)
-- Name: rol_idrol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_idrol_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_idrol_seq OWNER TO postgres;

--
-- TOC entry 5399 (class 0 OID 0)
-- Dependencies: 257
-- Name: rol_idrol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_idrol_seq OWNED BY public.rol.idrol;


--
-- TOC entry 258 (class 1259 OID 74227)
-- Name: tipocompra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipocompra (
    idtipocompra bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(150)
);


ALTER TABLE public.tipocompra OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 74234)
-- Name: tipocompra_idtipocompra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipocompra_idtipocompra_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipocompra_idtipocompra_seq OWNER TO postgres;

--
-- TOC entry 5400 (class 0 OID 0)
-- Dependencies: 259
-- Name: tipocompra_idtipocompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipocompra_idtipocompra_seq OWNED BY public.tipocompra.idtipocompra;


--
-- TOC entry 260 (class 1259 OID 74235)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    idusuario bigint NOT NULL,
    codigo character varying(20) DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    idrol bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 74250)
-- Name: usuario_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_idusuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_idusuario_seq OWNER TO postgres;

--
-- TOC entry 5401 (class 0 OID 0)
-- Dependencies: 261
-- Name: usuario_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;


--
-- TOC entry 262 (class 1259 OID 74251)
-- Name: venta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venta (
    idventa bigint NOT NULL,
    codigo uuid DEFAULT gen_random_uuid() NOT NULL,
    fecha timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    descuento numeric(10,2) DEFAULT 0 NOT NULL,
    total numeric(10,2) NOT NULL,
    idpedido bigint NOT NULL,
    idmetodopago bigint NOT NULL,
    CONSTRAINT chk_venta_descuento CHECK ((descuento >= (0)::numeric)),
    CONSTRAINT chk_venta_subtotal CHECK ((subtotal >= (0)::numeric)),
    CONSTRAINT chk_venta_total CHECK ((total >= (0)::numeric))
);


ALTER TABLE public.venta OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 74268)
-- Name: venta_idventa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venta_idventa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.venta_idventa_seq OWNER TO postgres;

--
-- TOC entry 5402 (class 0 OID 0)
-- Dependencies: 263
-- Name: venta_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venta_idventa_seq OWNED BY public.venta.idventa;


--
-- TOC entry 264 (class 1259 OID 74269)
-- Name: vw_compras_semanales; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_compras_semanales AS
 SELECT (date_trunc('week'::text, fecha))::date AS semana,
    sum(total) AS total
   FROM public.compra
  GROUP BY (date_trunc('week'::text, fecha))
  ORDER BY ((date_trunc('week'::text, fecha))::date) DESC;


ALTER VIEW public.vw_compras_semanales OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 74273)
-- Name: vw_ganancia_semanal; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_ganancia_semanal AS
 SELECT v.semana,
    (v.total - COALESCE(c.total, (0)::numeric)) AS ganancia
   FROM (( SELECT (date_trunc('week'::text, venta.fecha))::date AS semana,
            sum(venta.total) AS total
           FROM public.venta
          GROUP BY (date_trunc('week'::text, venta.fecha))) v
     LEFT JOIN ( SELECT (date_trunc('week'::text, compra.fecha))::date AS semana,
            sum(compra.total) AS total
           FROM public.compra
          GROUP BY (date_trunc('week'::text, compra.fecha))) c ON ((v.semana = c.semana)));


ALTER VIEW public.vw_ganancia_semanal OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 74278)
-- Name: vw_platos_mas_vendidos; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_platos_mas_vendidos AS
 SELECT p.nombre,
    sum(dp.cantidad) AS vendidos
   FROM (public.detallepedido dp
     JOIN public.plato p ON ((p.idplato = dp.idplato)))
  GROUP BY p.nombre
  ORDER BY (sum(dp.cantidad)) DESC;


ALTER VIEW public.vw_platos_mas_vendidos OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 74283)
-- Name: vw_ventas_diarias; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_ventas_diarias AS
 SELECT date(fecha) AS fecha,
    count(*) AS cantidad_ventas,
    sum(total) AS total
   FROM public.venta v
  GROUP BY (date(fecha))
  ORDER BY (date(fecha)) DESC;


ALTER VIEW public.vw_ventas_diarias OWNER TO postgres;

--
-- TOC entry 268 (class 1259 OID 74287)
-- Name: vw_ventas_semanales; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_ventas_semanales AS
 SELECT (date_trunc('week'::text, fecha))::date AS semana,
    count(*) AS ventas,
    sum(total) AS total
   FROM public.venta
  GROUP BY (date_trunc('week'::text, fecha))
  ORDER BY ((date_trunc('week'::text, fecha))::date) DESC;


ALTER VIEW public.vw_ventas_semanales OWNER TO postgres;

--
-- TOC entry 4972 (class 2604 OID 74536)
-- Name: bebida idbebida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida ALTER COLUMN idbebida SET DEFAULT nextval('public.bebida_idbebida_seq'::regclass);


--
-- TOC entry 4975 (class 2604 OID 74537)
-- Name: categoria idcategoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN idcategoria SET DEFAULT nextval('public.categoria_idcategoria_seq'::regclass);


--
-- TOC entry 4978 (class 2604 OID 74538)
-- Name: combo idcombo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo ALTER COLUMN idcombo SET DEFAULT nextval('public.combo_idcombo_seq'::regclass);


--
-- TOC entry 4981 (class 2604 OID 74539)
-- Name: compra idcompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra ALTER COLUMN idcompra SET DEFAULT nextval('public.compra_idcompra_seq'::regclass);


--
-- TOC entry 4985 (class 2604 OID 74540)
-- Name: configuracionrestaurante idconfiguracion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracionrestaurante ALTER COLUMN idconfiguracion SET DEFAULT nextval('public.configuracionrestaurante_idconfiguracion_seq'::regclass);


--
-- TOC entry 4986 (class 2604 OID 74541)
-- Name: detallecombo iddetallecombo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo ALTER COLUMN iddetallecombo SET DEFAULT nextval('public.detallecombo_iddetallecombo_seq'::regclass);


--
-- TOC entry 4989 (class 2604 OID 74542)
-- Name: detallecompra iddetalle_compra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra ALTER COLUMN iddetalle_compra SET DEFAULT nextval('public.detallecompra_iddetalle_compra_seq'::regclass);


--
-- TOC entry 4990 (class 2604 OID 74543)
-- Name: detallemenu iddetalle_menu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu ALTER COLUMN iddetalle_menu SET DEFAULT nextval('public.detallemenu_iddetalle_menu_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 74544)
-- Name: detallepedido iddetalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido ALTER COLUMN iddetalle SET DEFAULT nextval('public.detallepedido_iddetalle_seq'::regclass);


--
-- TOC entry 4994 (class 2604 OID 74545)
-- Name: estadopedido idestado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido ALTER COLUMN idestado SET DEFAULT nextval('public.estadopedido_idestado_seq'::regclass);


--
-- TOC entry 4995 (class 2604 OID 74546)
-- Name: gastoextra idgasto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra ALTER COLUMN idgasto SET DEFAULT nextval('public.gastoextra_idgasto_seq'::regclass);


--
-- TOC entry 4999 (class 2604 OID 74547)
-- Name: menu_dia idmenu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia ALTER COLUMN idmenu SET DEFAULT nextval('public.menu_dia_idmenu_seq'::regclass);


--
-- TOC entry 5001 (class 2604 OID 74548)
-- Name: mesa idmesa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa ALTER COLUMN idmesa SET DEFAULT nextval('public.mesa_idmesa_seq'::regclass);


--
-- TOC entry 5004 (class 2604 OID 74549)
-- Name: metodopago idmetodopago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago ALTER COLUMN idmetodopago SET DEFAULT nextval('public.metodopago_idmetodopago_seq'::regclass);


--
-- TOC entry 5006 (class 2604 OID 74550)
-- Name: modificacionpedido idmodificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido ALTER COLUMN idmodificacion SET DEFAULT nextval('public.modificacionpedido_idmodificacion_seq'::regclass);


--
-- TOC entry 5010 (class 2604 OID 74551)
-- Name: pedido idpedido; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN idpedido SET DEFAULT nextval('public.pedido_idpedido_seq'::regclass);


--
-- TOC entry 5013 (class 2604 OID 74552)
-- Name: plato idplato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato ALTER COLUMN idplato SET DEFAULT nextval('public.plato_idplato_seq'::regclass);


--
-- TOC entry 5016 (class 2604 OID 74553)
-- Name: producto idproducto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN idproducto SET DEFAULT nextval('public.producto_idproducto_seq'::regclass);


--
-- TOC entry 5019 (class 2604 OID 74554)
-- Name: rol idrol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN idrol SET DEFAULT nextval('public.rol_idrol_seq'::regclass);


--
-- TOC entry 5021 (class 2604 OID 74555)
-- Name: tipocompra idtipocompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra ALTER COLUMN idtipocompra SET DEFAULT nextval('public.tipocompra_idtipocompra_seq'::regclass);


--
-- TOC entry 5023 (class 2604 OID 74556)
-- Name: usuario idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);


--
-- TOC entry 5028 (class 2604 OID 74557)
-- Name: venta idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta ALTER COLUMN idventa SET DEFAULT nextval('public.venta_idventa_seq'::regclass);


--
-- TOC entry 5331 (class 0 OID 73996)
-- Dependencies: 220
-- Data for Name: bebida; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bebida VALUES (1, '3ff788f2-24b6-46f5-9999-f63ea08fb200', 'GASEOSA', 'Sprite 600ml', 12.00, 60, 58, 10, true);


--
-- TOC entry 5333 (class 0 OID 74015)
-- Dependencies: 222
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (2, '51201a3d-1496-43ef-87de-65ef8d2d29d9', 'Sopa', 'Sopas', true);
INSERT INTO public.categoria VALUES (3, '9b7e1b2a-67af-4f01-b5d6-20302189bfec', 'Segundo', 'Platos principales', true);
INSERT INTO public.categoria VALUES (4, '81a518cb-c42c-4d8b-812f-986145b96f7b', 'Postre', 'Postres', true);
INSERT INTO public.categoria VALUES (5, '3fb08c34-f7eb-4c25-aea6-a56d59e4fddf', 'Bebida', 'Bebidas', true);
INSERT INTO public.categoria VALUES (6, '9b7b24f1-3b76-4262-b3a2-2048040f7c7a', 'Platos', 'Platos principales', true);
INSERT INTO public.categoria VALUES (8, 'fef5f3a0-49f3-4d5d-a5ae-77cf247cbb13', 'Platose', 'Platos principalese', true);
INSERT INTO public.categoria VALUES (1, '60c42615-7bc0-4e90-85e1-4f73104f5409', 'Entrada', 'Entradas', false);
INSERT INTO public.categoria VALUES (10, '384ec572-193e-4022-a3e3-638e1236b8fd', 'Platoss', 'Platos principales', true);


--
-- TOC entry 5335 (class 0 OID 74025)
-- Dependencies: 224
-- Data for Name: combo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.combo VALUES (2, 'Combo Ejecutivo', 'Sopa + Milanesa', 45.00, true, NULL, '2026-07-24 21:37:23.968555', NULL, NULL);


--
-- TOC entry 5337 (class 0 OID 74038)
-- Dependencies: 226
-- Data for Name: compra; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5339 (class 0 OID 74055)
-- Dependencies: 228
-- Data for Name: configuracionrestaurante; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5341 (class 0 OID 74063)
-- Dependencies: 230
-- Data for Name: detallecombo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detallecombo VALUES (3, 1, 2, 1, true, '2026-07-24 21:37:23.968555', NULL, NULL);
INSERT INTO public.detallecombo VALUES (4, 1, 2, 2, true, '2026-07-24 21:37:23.968555', NULL, NULL);


--
-- TOC entry 5343 (class 0 OID 74075)
-- Dependencies: 232
-- Data for Name: detallecompra; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5345 (class 0 OID 74088)
-- Dependencies: 234
-- Data for Name: detallemenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detallemenu VALUES (2, 10, true, 1, 2);
INSERT INTO public.detallemenu VALUES (1, 8, false, 1, 1);


--
-- TOC entry 5347 (class 0 OID 74098)
-- Dependencies: 236
-- Data for Name: detallepedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detallepedido VALUES (2, 2, 12.00, 24.00, NULL, true, 2, NULL, 1, 1);
INSERT INTO public.detallepedido VALUES (1, 2, 35.00, 70.00, NULL, true, 2, 1, NULL, 2);


--
-- TOC entry 5349 (class 0 OID 74112)
-- Dependencies: 238
-- Data for Name: estadopedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estadopedido VALUES (1, 'Pendiente', 'Pedido recién registrado');
INSERT INTO public.estadopedido VALUES (2, 'En preparación', 'La cocina está preparando el pedido');
INSERT INTO public.estadopedido VALUES (3, 'Parcialmente entregado', 'Parte del pedido ya fue entregado');
INSERT INTO public.estadopedido VALUES (4, 'Listo', 'Pedido listo para entregar');
INSERT INTO public.estadopedido VALUES (5, 'Entregado', 'Pedido entregado completamente');
INSERT INTO public.estadopedido VALUES (6, 'Cancelado', 'Pedido cancelado');


--
-- TOC entry 5351 (class 0 OID 74118)
-- Dependencies: 240
-- Data for Name: gastoextra; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5353 (class 0 OID 74134)
-- Dependencies: 242
-- Data for Name: menu_dia; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.menu_dia VALUES (1, '2026-07-24', 'CERRADO', '6f85322b-3298-457c-b9cb-996615397ff8');


--
-- TOC entry 5355 (class 0 OID 74143)
-- Dependencies: 244
-- Data for Name: mesa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mesa VALUES (1, '960489be-9c94-438a-8590-58913446d06d', 1, 6, true);


--
-- TOC entry 5357 (class 0 OID 74155)
-- Dependencies: 246
-- Data for Name: metodopago; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.metodopago VALUES (1, 'Efectivo', 'Pago en efectivo', true);
INSERT INTO public.metodopago VALUES (2, 'QR', 'Pago mediante código QR', true);
INSERT INTO public.metodopago VALUES (3, 'Tarjeta', 'Pago con tarjeta', true);
INSERT INTO public.metodopago VALUES (4, 'Transferencia', 'Transferencia bancaria', true);


--
-- TOC entry 5359 (class 0 OID 74163)
-- Dependencies: 248
-- Data for Name: modificacionpedido; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5361 (class 0 OID 74179)
-- Dependencies: 250
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pedido VALUES (2, 'RESTAURANTE', '2026-07-25 06:42:33.850656-04', 94.00, 1, 1, '365e6a88-5a36-40af-b17f-cdc0f384c411', 1);


--
-- TOC entry 5363 (class 0 OID 74193)
-- Dependencies: 252
-- Data for Name: plato; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.plato VALUES (1, 'Milanesa Especial', 'Con huevo', 35.00, true, '2026-07-24 21:25:34.170334-04', '2026-07-24 21:25:57.197988-04', NULL, 1);
INSERT INTO public.plato VALUES (2, 'Milanesa', 'Milanesa de res', 30.00, true, '2026-07-24 21:37:08.179652-04', NULL, NULL, 1);


--
-- TOC entry 5365 (class 0 OID 74207)
-- Dependencies: 254
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5367 (class 0 OID 74219)
-- Dependencies: 256
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rol VALUES (1, 'e531c631-405c-4f20-a07b-4799cb8ff992', 'Administrador', 'Acceso completo al sistema');
INSERT INTO public.rol VALUES (2, '4d80bd69-c40c-4dec-823a-2e0b1a431d14', 'Cajero', 'Gestiona pedidos, ventas y cobros');
INSERT INTO public.rol VALUES (3, 'd1345def-c337-48db-93ff-35f7301c9a82', 'Mesero', 'Registra y consulta pedidos');
INSERT INTO public.rol VALUES (4, '7c5d7d34-eebd-479e-831d-34f2e618efdb', 'Cocinero', 'Gestiona la preparación de pedidos');


--
-- TOC entry 5369 (class 0 OID 74227)
-- Dependencies: 258
-- Data for Name: tipocompra; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipocompra VALUES (1, '8d60a3d1-dfcb-4e5a-bd88-5db772398b24', 'Ingredientes', 'Compra de ingredientes');
INSERT INTO public.tipocompra VALUES (2, 'b2d0b99c-192b-4d06-b71c-3d83b66f4c0d', 'Bebidas', 'Compra de bebidas');
INSERT INTO public.tipocompra VALUES (3, 'dbebba35-be77-45cf-98e1-0ac69707bcfc', 'Limpieza', 'Productos de limpieza');
INSERT INTO public.tipocompra VALUES (4, 'b5d6dd80-78c5-4747-ba6e-72fc64c1a054', 'Gas', 'Compra de gas');
INSERT INTO public.tipocompra VALUES (5, 'ee12cad1-82df-472b-950a-fde433fbb54a', 'Otros', 'Otros gastos de compra');


--
-- TOC entry 5371 (class 0 OID 74235)
-- Dependencies: 260
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES (4, 'USR004', 'cocina', 'HASH', true, 4, '2026-07-24 18:19:43.63556', '2026-07-24 18:19:43.63556');
INSERT INTO public.usuario VALUES (1, 'USR001', 'admin', '$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\kVbw2fp3USyzxlwHSK', true, 1, '2026-07-24 18:19:43.63556', '2026-07-24 18:19:43.63556');
INSERT INTO public.usuario VALUES (2, 'USR002', 'cajero', '$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\kVbw2fp3USyzxlwHSK', true, 2, '2026-07-24 18:19:43.63556', '2026-07-24 18:19:43.63556');
INSERT INTO public.usuario VALUES (3, 'USR003', 'mesero', '$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\kVbw2fp3USyzxlwHSK', true, 3, '2026-07-24 18:19:43.63556', '2026-07-24 18:19:43.63556');


--
-- TOC entry 5373 (class 0 OID 74251)
-- Dependencies: 262
-- Data for Name: venta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.venta VALUES (1, '7c9820e4-5933-47e4-8c17-e48a7046de73', '2026-07-25 07:17:28.158805-04', 94.00, 0.00, 94.00, 2, 1);


--
-- TOC entry 5403 (class 0 OID 0)
-- Dependencies: 221
-- Name: bebida_idbebida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bebida_idbebida_seq', 1, true);


--
-- TOC entry 5404 (class 0 OID 0)
-- Dependencies: 223
-- Name: categoria_idcategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_idcategoria_seq', 10, true);


--
-- TOC entry 5405 (class 0 OID 0)
-- Dependencies: 225
-- Name: combo_idcombo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.combo_idcombo_seq', 2, true);


--
-- TOC entry 5406 (class 0 OID 0)
-- Dependencies: 227
-- Name: compra_idcompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compra_idcompra_seq', 1, false);


--
-- TOC entry 5407 (class 0 OID 0)
-- Dependencies: 229
-- Name: configuracionrestaurante_idconfiguracion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuracionrestaurante_idconfiguracion_seq', 1, false);


--
-- TOC entry 5408 (class 0 OID 0)
-- Dependencies: 231
-- Name: detallecombo_iddetallecombo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallecombo_iddetallecombo_seq', 4, true);


--
-- TOC entry 5409 (class 0 OID 0)
-- Dependencies: 233
-- Name: detallecompra_iddetalle_compra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallecompra_iddetalle_compra_seq', 1, false);


--
-- TOC entry 5410 (class 0 OID 0)
-- Dependencies: 235
-- Name: detallemenu_iddetalle_menu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallemenu_iddetalle_menu_seq', 2, true);


--
-- TOC entry 5411 (class 0 OID 0)
-- Dependencies: 237
-- Name: detallepedido_iddetalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallepedido_iddetalle_seq', 2, true);


--
-- TOC entry 5412 (class 0 OID 0)
-- Dependencies: 239
-- Name: estadopedido_idestado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estadopedido_idestado_seq', 6, true);


--
-- TOC entry 5413 (class 0 OID 0)
-- Dependencies: 241
-- Name: gastoextra_idgasto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gastoextra_idgasto_seq', 1, false);


--
-- TOC entry 5414 (class 0 OID 0)
-- Dependencies: 243
-- Name: menu_dia_idmenu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_dia_idmenu_seq', 1, true);


--
-- TOC entry 5415 (class 0 OID 0)
-- Dependencies: 245
-- Name: mesa_idmesa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesa_idmesa_seq', 1, true);


--
-- TOC entry 5416 (class 0 OID 0)
-- Dependencies: 247
-- Name: metodopago_idmetodopago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodopago_idmetodopago_seq', 4, true);


--
-- TOC entry 5417 (class 0 OID 0)
-- Dependencies: 249
-- Name: modificacionpedido_idmodificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modificacionpedido_idmodificacion_seq', 1, false);


--
-- TOC entry 5418 (class 0 OID 0)
-- Dependencies: 251
-- Name: pedido_idpedido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_idpedido_seq', 2, true);


--
-- TOC entry 5419 (class 0 OID 0)
-- Dependencies: 253
-- Name: plato_idplato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plato_idplato_seq', 2, true);


--
-- TOC entry 5420 (class 0 OID 0)
-- Dependencies: 255
-- Name: producto_idproducto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_idproducto_seq', 1, false);


--
-- TOC entry 5421 (class 0 OID 0)
-- Dependencies: 257
-- Name: rol_idrol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_idrol_seq', 4, true);


--
-- TOC entry 5422 (class 0 OID 0)
-- Dependencies: 259
-- Name: tipocompra_idtipocompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipocompra_idtipocompra_seq', 5, true);


--
-- TOC entry 5423 (class 0 OID 0)
-- Dependencies: 261
-- Name: usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_idusuario_seq', 4, true);


--
-- TOC entry 5424 (class 0 OID 0)
-- Dependencies: 263
-- Name: venta_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venta_idventa_seq', 1, true);


--
-- TOC entry 5054 (class 2606 OID 74314)
-- Name: bebida bebida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida
    ADD CONSTRAINT bebida_pkey PRIMARY KEY (idbebida);


--
-- TOC entry 5059 (class 2606 OID 74316)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (idcategoria);


--
-- TOC entry 5065 (class 2606 OID 74318)
-- Name: combo combo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT combo_pkey PRIMARY KEY (idcombo);


--
-- TOC entry 5067 (class 2606 OID 74320)
-- Name: compra compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (idcompra);


--
-- TOC entry 5072 (class 2606 OID 74322)
-- Name: configuracionrestaurante configuracionrestaurante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracionrestaurante
    ADD CONSTRAINT configuracionrestaurante_pkey PRIMARY KEY (idconfiguracion);


--
-- TOC entry 5074 (class 2606 OID 74324)
-- Name: detallecombo detallecombo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT detallecombo_pkey PRIMARY KEY (iddetallecombo);


--
-- TOC entry 5076 (class 2606 OID 74326)
-- Name: detallecompra detallecompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_pkey PRIMARY KEY (iddetalle_compra);


--
-- TOC entry 5078 (class 2606 OID 74328)
-- Name: detallemenu detallemenu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT detallemenu_pkey PRIMARY KEY (iddetalle_menu);


--
-- TOC entry 5080 (class 2606 OID 74330)
-- Name: detallepedido detallepedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT detallepedido_pkey PRIMARY KEY (iddetalle);


--
-- TOC entry 5084 (class 2606 OID 74332)
-- Name: estadopedido estadopedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido
    ADD CONSTRAINT estadopedido_pkey PRIMARY KEY (idestado);


--
-- TOC entry 5088 (class 2606 OID 74334)
-- Name: gastoextra gastoextra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT gastoextra_pkey PRIMARY KEY (idgasto);


--
-- TOC entry 5092 (class 2606 OID 74336)
-- Name: menu_dia menu_dia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT menu_dia_pkey PRIMARY KEY (idmenu);


--
-- TOC entry 5098 (class 2606 OID 74338)
-- Name: mesa mesa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT mesa_pkey PRIMARY KEY (idmesa);


--
-- TOC entry 5104 (class 2606 OID 74340)
-- Name: metodopago metodopago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (idmetodopago);


--
-- TOC entry 5108 (class 2606 OID 74342)
-- Name: modificacionpedido modificacionpedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT modificacionpedido_pkey PRIMARY KEY (idmodificacion);


--
-- TOC entry 5116 (class 2606 OID 74344)
-- Name: pedido pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (idpedido);


--
-- TOC entry 5122 (class 2606 OID 74346)
-- Name: plato plato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato
    ADD CONSTRAINT plato_pkey PRIMARY KEY (idplato);


--
-- TOC entry 5125 (class 2606 OID 74348)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (idproducto);


--
-- TOC entry 5131 (class 2606 OID 74350)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (idrol);


--
-- TOC entry 5137 (class 2606 OID 74352)
-- Name: tipocompra tipocompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT tipocompra_pkey PRIMARY KEY (idtipocompra);


--
-- TOC entry 5057 (class 2606 OID 74354)
-- Name: bebida uq_bebida_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida
    ADD CONSTRAINT uq_bebida_codigo UNIQUE (codigo);


--
-- TOC entry 5061 (class 2606 OID 74356)
-- Name: categoria uq_categoria_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT uq_categoria_codigo UNIQUE (codigo_categoria);


--
-- TOC entry 5063 (class 2606 OID 74358)
-- Name: categoria uq_categoria_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT uq_categoria_nombre UNIQUE (nombre);


--
-- TOC entry 5070 (class 2606 OID 74360)
-- Name: compra uq_compra_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT uq_compra_codigo UNIQUE (codigo);


--
-- TOC entry 5086 (class 2606 OID 74362)
-- Name: estadopedido uq_estado_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido
    ADD CONSTRAINT uq_estado_nombre UNIQUE (nombre);


--
-- TOC entry 5090 (class 2606 OID 74364)
-- Name: gastoextra uq_gasto_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT uq_gasto_codigo UNIQUE (codigo);


--
-- TOC entry 5094 (class 2606 OID 74366)
-- Name: menu_dia uq_menu_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT uq_menu_codigo UNIQUE (codigo_menu);


--
-- TOC entry 5096 (class 2606 OID 74368)
-- Name: menu_dia uq_menu_fecha; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT uq_menu_fecha UNIQUE (fecha);


--
-- TOC entry 5100 (class 2606 OID 74370)
-- Name: mesa uq_mesa_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT uq_mesa_codigo UNIQUE (codigo);


--
-- TOC entry 5102 (class 2606 OID 74372)
-- Name: mesa uq_mesa_numero; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT uq_mesa_numero UNIQUE (numero);


--
-- TOC entry 5106 (class 2606 OID 74374)
-- Name: metodopago uq_metodopago; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT uq_metodopago UNIQUE (nombre);


--
-- TOC entry 5110 (class 2606 OID 74376)
-- Name: modificacionpedido uq_modificacion_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT uq_modificacion_codigo UNIQUE (codigo);


--
-- TOC entry 5118 (class 2606 OID 74378)
-- Name: pedido uq_pedido_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT uq_pedido_codigo UNIQUE (codigo_pedido);


--
-- TOC entry 5127 (class 2606 OID 74380)
-- Name: producto uq_producto_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT uq_producto_codigo UNIQUE (codigo);


--
-- TOC entry 5129 (class 2606 OID 74382)
-- Name: producto uq_producto_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT uq_producto_nombre UNIQUE (nombre);


--
-- TOC entry 5133 (class 2606 OID 74384)
-- Name: rol uq_rol_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_codigo UNIQUE (codigo);


--
-- TOC entry 5135 (class 2606 OID 74386)
-- Name: rol uq_rol_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_nombre UNIQUE (nombre);


--
-- TOC entry 5139 (class 2606 OID 74388)
-- Name: tipocompra uq_tipocompra_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT uq_tipocompra_codigo UNIQUE (codigo);


--
-- TOC entry 5141 (class 2606 OID 74390)
-- Name: tipocompra uq_tipocompra_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT uq_tipocompra_nombre UNIQUE (nombre);


--
-- TOC entry 5144 (class 2606 OID 74392)
-- Name: usuario uq_usuario_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_codigo UNIQUE (codigo);


--
-- TOC entry 5146 (class 2606 OID 74394)
-- Name: usuario uq_usuario_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_usuario UNIQUE (username);


--
-- TOC entry 5152 (class 2606 OID 74396)
-- Name: venta uq_venta_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT uq_venta_codigo UNIQUE (codigo);


--
-- TOC entry 5148 (class 2606 OID 74398)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 5154 (class 2606 OID 74400)
-- Name: venta venta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (idventa);


--
-- TOC entry 5055 (class 1259 OID 74401)
-- Name: idx_bebida_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bebida_nombre ON public.bebida USING btree (nombre);


--
-- TOC entry 5068 (class 1259 OID 74402)
-- Name: idx_compra_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_compra_fecha ON public.compra USING btree (fecha);


--
-- TOC entry 5081 (class 1259 OID 74403)
-- Name: idx_detallepedido_pedido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detallepedido_pedido ON public.detallepedido USING btree (idpedido);


--
-- TOC entry 5082 (class 1259 OID 74404)
-- Name: idx_detallepedido_plato; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detallepedido_plato ON public.detallepedido USING btree (idplato);


--
-- TOC entry 5111 (class 1259 OID 74405)
-- Name: idx_pedido_estado; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_estado ON public.pedido USING btree (idestado);


--
-- TOC entry 5112 (class 1259 OID 74406)
-- Name: idx_pedido_fecha_hora; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_fecha_hora ON public.pedido USING btree (fecha_hora);


--
-- TOC entry 5113 (class 1259 OID 74407)
-- Name: idx_pedido_mesa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_mesa ON public.pedido USING btree (idmesa);


--
-- TOC entry 5114 (class 1259 OID 74408)
-- Name: idx_pedido_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_usuario ON public.pedido USING btree (idusuario);


--
-- TOC entry 5119 (class 1259 OID 74409)
-- Name: idx_plato_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_plato_categoria ON public.plato USING btree (idcategoria);


--
-- TOC entry 5120 (class 1259 OID 74410)
-- Name: idx_plato_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_plato_nombre ON public.plato USING btree (nombre);


--
-- TOC entry 5123 (class 1259 OID 74411)
-- Name: idx_producto_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_producto_nombre ON public.producto USING btree (nombre);


--
-- TOC entry 5142 (class 1259 OID 74412)
-- Name: idx_usuario_rol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuario_rol ON public.usuario USING btree (idrol);


--
-- TOC entry 5149 (class 1259 OID 74413)
-- Name: idx_venta_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_venta_fecha ON public.venta USING btree (fecha);


--
-- TOC entry 5150 (class 1259 OID 74414)
-- Name: idx_venta_pedido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_venta_pedido ON public.venta USING btree (idpedido);


--
-- TOC entry 5155 (class 2606 OID 74415)
-- Name: combo fk_combo_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT fk_combo_menu FOREIGN KEY (idmenu) REFERENCES public.menu_dia(idmenu);


--
-- TOC entry 5156 (class 2606 OID 74420)
-- Name: compra fk_compra_tipocompra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_compra_tipocompra FOREIGN KEY (idtipocompra) REFERENCES public.tipocompra(idtipocompra) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5157 (class 2606 OID 74425)
-- Name: compra fk_compra_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_compra_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5158 (class 2606 OID 74430)
-- Name: detallecombo fk_detallecombo_combo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT fk_detallecombo_combo FOREIGN KEY (idcombo) REFERENCES public.combo(idcombo) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5159 (class 2606 OID 74435)
-- Name: detallecombo fk_detallecombo_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT fk_detallecombo_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5160 (class 2606 OID 74440)
-- Name: detallecompra fk_detallecompra_compra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT fk_detallecompra_compra FOREIGN KEY (idcompra) REFERENCES public.compra(idcompra) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5161 (class 2606 OID 74445)
-- Name: detallecompra fk_detallecompra_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT fk_detallecompra_producto FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5162 (class 2606 OID 74450)
-- Name: detallemenu fk_detallemenu_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT fk_detallemenu_menu FOREIGN KEY (idmenu) REFERENCES public.menu_dia(idmenu) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5163 (class 2606 OID 74455)
-- Name: detallemenu fk_detallemenu_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT fk_detallemenu_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5164 (class 2606 OID 74460)
-- Name: detallepedido fk_detallepedido_bebida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_bebida FOREIGN KEY (idbebida) REFERENCES public.bebida(idbebida) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5165 (class 2606 OID 74465)
-- Name: detallepedido fk_detallepedido_estadopedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_estadopedido FOREIGN KEY (idestadopedido) REFERENCES public.estadopedido(idestado);


--
-- TOC entry 5166 (class 2606 OID 74470)
-- Name: detallepedido fk_detallepedido_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5167 (class 2606 OID 74475)
-- Name: detallepedido fk_detallepedido_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5168 (class 2606 OID 74480)
-- Name: gastoextra fk_gasto_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT fk_gasto_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5169 (class 2606 OID 74485)
-- Name: modificacionpedido fk_modificacion_detalle; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_detalle FOREIGN KEY (iddetalle) REFERENCES public.detallepedido(iddetalle) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5170 (class 2606 OID 74490)
-- Name: modificacionpedido fk_modificacion_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5171 (class 2606 OID 74495)
-- Name: modificacionpedido fk_modificacion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5172 (class 2606 OID 74500)
-- Name: pedido fk_pedido_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_estado FOREIGN KEY (idestado) REFERENCES public.estadopedido(idestado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5173 (class 2606 OID 74505)
-- Name: pedido fk_pedido_mesa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_mesa FOREIGN KEY (idmesa) REFERENCES public.mesa(idmesa) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5174 (class 2606 OID 74510)
-- Name: pedido fk_pedido_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5175 (class 2606 OID 74515)
-- Name: plato fk_plato_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato
    ADD CONSTRAINT fk_plato_categoria FOREIGN KEY (idcategoria) REFERENCES public.categoria(idcategoria) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5176 (class 2606 OID 74520)
-- Name: usuario fk_usuario_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (idrol) REFERENCES public.rol(idrol) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5177 (class 2606 OID 74525)
-- Name: venta fk_venta_metodopago; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT fk_venta_metodopago FOREIGN KEY (idmetodopago) REFERENCES public.metodopago(idmetodopago) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5178 (class 2606 OID 74530)
-- Name: venta fk_venta_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT fk_venta_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2026-07-25 19:21:22

--
-- PostgreSQL database dump complete
--

\unrestrict zC2aEs11gCeaYdJOzug27W1owlYpcNL9mcj4K6p9rCxnYnDIfAtXosJJpxLpn7c

