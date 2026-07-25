--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-07-25 08:04:28

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
-- TOC entry 2 (class 3079 OID 79666)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 237 (class 1259 OID 79825)
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
-- TOC entry 236 (class 1259 OID 79824)
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
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 236
-- Name: bebida_idbebida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bebida_idbebida_seq OWNED BY public.bebida.idbebida;


--
-- TOC entry 231 (class 1259 OID 79780)
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
-- TOC entry 230 (class 1259 OID 79779)
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
-- TOC entry 5211 (class 0 OID 0)
-- Dependencies: 230
-- Name: categoria_idcategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_idcategoria_seq OWNED BY public.categoria.idcategoria;


--
-- TOC entry 239 (class 1259 OID 79840)
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
-- TOC entry 238 (class 1259 OID 79839)
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
-- TOC entry 5212 (class 0 OID 0)
-- Dependencies: 238
-- Name: combo_idcombo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.combo_idcombo_seq OWNED BY public.combo.idcombo;


--
-- TOC entry 247 (class 1259 OID 79900)
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
-- TOC entry 246 (class 1259 OID 79899)
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
-- TOC entry 5213 (class 0 OID 0)
-- Dependencies: 246
-- Name: compra_idcompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compra_idcompra_seq OWNED BY public.compra.idcompra;


--
-- TOC entry 261 (class 1259 OID 80073)
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
-- TOC entry 260 (class 1259 OID 80072)
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
-- TOC entry 5214 (class 0 OID 0)
-- Dependencies: 260
-- Name: configuracionrestaurante_idconfiguracion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracionrestaurante_idconfiguracion_seq OWNED BY public.configuracionrestaurante.idconfiguracion;


--
-- TOC entry 241 (class 1259 OID 79851)
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
-- TOC entry 240 (class 1259 OID 79850)
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
-- TOC entry 5215 (class 0 OID 0)
-- Dependencies: 240
-- Name: detallecombo_iddetallecombo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallecombo_iddetallecombo_seq OWNED BY public.detallecombo.iddetallecombo;


--
-- TOC entry 249 (class 1259 OID 79925)
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
-- TOC entry 248 (class 1259 OID 79924)
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
-- TOC entry 5216 (class 0 OID 0)
-- Dependencies: 248
-- Name: detallecompra_iddetalle_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallecompra_iddetalle_compra_seq OWNED BY public.detallecompra.iddetalle_compra;


--
-- TOC entry 245 (class 1259 OID 79881)
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
-- TOC entry 244 (class 1259 OID 79880)
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
-- TOC entry 5217 (class 0 OID 0)
-- Dependencies: 244
-- Name: detallemenu_iddetalle_menu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallemenu_iddetalle_menu_seq OWNED BY public.detallemenu.iddetalle_menu;


--
-- TOC entry 255 (class 1259 OID 79993)
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
-- TOC entry 254 (class 1259 OID 79992)
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
-- TOC entry 5218 (class 0 OID 0)
-- Dependencies: 254
-- Name: detallepedido_iddetalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallepedido_iddetalle_seq OWNED BY public.detallepedido.iddetalle;


--
-- TOC entry 225 (class 1259 OID 79750)
-- Name: estadopedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadopedido (
    idestado bigint NOT NULL,
    nombre character varying(40) NOT NULL,
    descripcion character varying(120)
);


ALTER TABLE public.estadopedido OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 79749)
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
-- TOC entry 5219 (class 0 OID 0)
-- Dependencies: 224
-- Name: estadopedido_idestado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estadopedido_idestado_seq OWNED BY public.estadopedido.idestado;


--
-- TOC entry 251 (class 1259 OID 79945)
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
-- TOC entry 250 (class 1259 OID 79944)
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
-- TOC entry 5220 (class 0 OID 0)
-- Dependencies: 250
-- Name: gastoextra_idgasto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gastoextra_idgasto_seq OWNED BY public.gastoextra.idgasto;


--
-- TOC entry 243 (class 1259 OID 79869)
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
-- TOC entry 242 (class 1259 OID 79868)
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
-- TOC entry 5221 (class 0 OID 0)
-- Dependencies: 242
-- Name: menu_dia_idmenu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_dia_idmenu_seq OWNED BY public.menu_dia.idmenu;


--
-- TOC entry 223 (class 1259 OID 79736)
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
-- TOC entry 222 (class 1259 OID 79735)
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
-- TOC entry 5222 (class 0 OID 0)
-- Dependencies: 222
-- Name: mesa_idmesa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesa_idmesa_seq OWNED BY public.mesa.idmesa;


--
-- TOC entry 227 (class 1259 OID 79759)
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
-- TOC entry 226 (class 1259 OID 79758)
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
-- TOC entry 5223 (class 0 OID 0)
-- Dependencies: 226
-- Name: metodopago_idmetodopago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodopago_idmetodopago_seq OWNED BY public.metodopago.idmetodopago;


--
-- TOC entry 259 (class 1259 OID 80044)
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
-- TOC entry 258 (class 1259 OID 80043)
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
-- TOC entry 5224 (class 0 OID 0)
-- Dependencies: 258
-- Name: modificacionpedido_idmodificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modificacionpedido_idmodificacion_seq OWNED BY public.modificacionpedido.idmodificacion;


--
-- TOC entry 253 (class 1259 OID 79966)
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
-- TOC entry 252 (class 1259 OID 79965)
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
-- TOC entry 5225 (class 0 OID 0)
-- Dependencies: 252
-- Name: pedido_idpedido_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_idpedido_seq OWNED BY public.pedido.idpedido;


--
-- TOC entry 235 (class 1259 OID 79808)
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
-- TOC entry 234 (class 1259 OID 79807)
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
-- TOC entry 5226 (class 0 OID 0)
-- Dependencies: 234
-- Name: plato_idplato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plato_idplato_seq OWNED BY public.plato.idplato;


--
-- TOC entry 233 (class 1259 OID 79793)
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
-- TOC entry 232 (class 1259 OID 79792)
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
-- TOC entry 5227 (class 0 OID 0)
-- Dependencies: 232
-- Name: producto_idproducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_idproducto_seq OWNED BY public.producto.idproducto;


--
-- TOC entry 219 (class 1259 OID 79704)
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
-- TOC entry 218 (class 1259 OID 79703)
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
-- TOC entry 5228 (class 0 OID 0)
-- Dependencies: 218
-- Name: rol_idrol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_idrol_seq OWNED BY public.rol.idrol;


--
-- TOC entry 229 (class 1259 OID 79768)
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
-- TOC entry 228 (class 1259 OID 79767)
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
-- TOC entry 5229 (class 0 OID 0)
-- Dependencies: 228
-- Name: tipocompra_idtipocompra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipocompra_idtipocompra_seq OWNED BY public.tipocompra.idtipocompra;


--
-- TOC entry 221 (class 1259 OID 79716)
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
-- TOC entry 220 (class 1259 OID 79715)
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
-- TOC entry 5230 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuario_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;


--
-- TOC entry 257 (class 1259 OID 80019)
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
-- TOC entry 256 (class 1259 OID 80018)
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
-- TOC entry 5231 (class 0 OID 0)
-- Dependencies: 256
-- Name: venta_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venta_idventa_seq OWNED BY public.venta.idventa;


--
-- TOC entry 264 (class 1259 OID 80104)
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
-- TOC entry 266 (class 1259 OID 80113)
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
-- TOC entry 265 (class 1259 OID 80108)
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
-- TOC entry 262 (class 1259 OID 80096)
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
-- TOC entry 263 (class 1259 OID 80100)
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
-- TOC entry 4827 (class 2604 OID 79828)
-- Name: bebida idbebida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida ALTER COLUMN idbebida SET DEFAULT nextval('public.bebida_idbebida_seq'::regclass);


--
-- TOC entry 4818 (class 2604 OID 79783)
-- Name: categoria idcategoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN idcategoria SET DEFAULT nextval('public.categoria_idcategoria_seq'::regclass);


--
-- TOC entry 4830 (class 2604 OID 79843)
-- Name: combo idcombo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo ALTER COLUMN idcombo SET DEFAULT nextval('public.combo_idcombo_seq'::regclass);


--
-- TOC entry 4840 (class 2604 OID 79903)
-- Name: compra idcompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra ALTER COLUMN idcompra SET DEFAULT nextval('public.compra_idcompra_seq'::regclass);


--
-- TOC entry 4862 (class 2604 OID 80076)
-- Name: configuracionrestaurante idconfiguracion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracionrestaurante ALTER COLUMN idconfiguracion SET DEFAULT nextval('public.configuracionrestaurante_idconfiguracion_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 79854)
-- Name: detallecombo iddetallecombo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo ALTER COLUMN iddetallecombo SET DEFAULT nextval('public.detallecombo_iddetallecombo_seq'::regclass);


--
-- TOC entry 4844 (class 2604 OID 79928)
-- Name: detallecompra iddetalle_compra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra ALTER COLUMN iddetalle_compra SET DEFAULT nextval('public.detallecompra_iddetalle_compra_seq'::regclass);


--
-- TOC entry 4838 (class 2604 OID 79884)
-- Name: detallemenu iddetalle_menu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu ALTER COLUMN iddetalle_menu SET DEFAULT nextval('public.detallemenu_iddetalle_menu_seq'::regclass);


--
-- TOC entry 4852 (class 2604 OID 79996)
-- Name: detallepedido iddetalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido ALTER COLUMN iddetalle SET DEFAULT nextval('public.detallepedido_iddetalle_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 79753)
-- Name: estadopedido idestado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido ALTER COLUMN idestado SET DEFAULT nextval('public.estadopedido_idestado_seq'::regclass);


--
-- TOC entry 4845 (class 2604 OID 79948)
-- Name: gastoextra idgasto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra ALTER COLUMN idgasto SET DEFAULT nextval('public.gastoextra_idgasto_seq'::regclass);


--
-- TOC entry 4836 (class 2604 OID 79872)
-- Name: menu_dia idmenu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia ALTER COLUMN idmenu SET DEFAULT nextval('public.menu_dia_idmenu_seq'::regclass);


--
-- TOC entry 4810 (class 2604 OID 79739)
-- Name: mesa idmesa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa ALTER COLUMN idmesa SET DEFAULT nextval('public.mesa_idmesa_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 79762)
-- Name: metodopago idmetodopago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago ALTER COLUMN idmetodopago SET DEFAULT nextval('public.metodopago_idmetodopago_seq'::regclass);


--
-- TOC entry 4858 (class 2604 OID 80047)
-- Name: modificacionpedido idmodificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido ALTER COLUMN idmodificacion SET DEFAULT nextval('public.modificacionpedido_idmodificacion_seq'::regclass);


--
-- TOC entry 4849 (class 2604 OID 79969)
-- Name: pedido idpedido; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN idpedido SET DEFAULT nextval('public.pedido_idpedido_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 79811)
-- Name: plato idplato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato ALTER COLUMN idplato SET DEFAULT nextval('public.plato_idplato_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 79796)
-- Name: producto idproducto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN idproducto SET DEFAULT nextval('public.producto_idproducto_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 79707)
-- Name: rol idrol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN idrol SET DEFAULT nextval('public.rol_idrol_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 79771)
-- Name: tipocompra idtipocompra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra ALTER COLUMN idtipocompra SET DEFAULT nextval('public.tipocompra_idtipocompra_seq'::regclass);


--
-- TOC entry 4805 (class 2604 OID 79719)
-- Name: usuario idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);


--
-- TOC entry 4854 (class 2604 OID 80022)
-- Name: venta idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta ALTER COLUMN idventa SET DEFAULT nextval('public.venta_idventa_seq'::regclass);


--
-- TOC entry 5179 (class 0 OID 79825)
-- Dependencies: 237
-- Data for Name: bebida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bebida (idbebida, codigo, tipo_bebida, nombre, precio, stock_total, stock_disponible, stock_minimo, activo) FROM stdin;
1	3ff788f2-24b6-46f5-9999-f63ea08fb200	GASEOSA	Sprite 600ml	12.00	60	58	10	t
\.


--
-- TOC entry 5173 (class 0 OID 79780)
-- Dependencies: 231
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (idcategoria, codigo_categoria, nombre, descripcion, activo) FROM stdin;
2	51201a3d-1496-43ef-87de-65ef8d2d29d9	Sopa	Sopas	t
3	9b7e1b2a-67af-4f01-b5d6-20302189bfec	Segundo	Platos principales	t
4	81a518cb-c42c-4d8b-812f-986145b96f7b	Postre	Postres	t
5	3fb08c34-f7eb-4c25-aea6-a56d59e4fddf	Bebida	Bebidas	t
6	9b7b24f1-3b76-4262-b3a2-2048040f7c7a	Platos	Platos principales	t
8	fef5f3a0-49f3-4d5d-a5ae-77cf247cbb13	Platose	Platos principalese	t
1	60c42615-7bc0-4e90-85e1-4f73104f5409	Entrada	Entradas	f
10	384ec572-193e-4022-a3e3-638e1236b8fd	Platoss	Platos principales	t
\.


--
-- TOC entry 5181 (class 0 OID 79840)
-- Dependencies: 239
-- Data for Name: combo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.combo (idcombo, nombre, descripcion, precio, activo, idmenu, fecha_creacion, fecha_actualizacion, fecha_eliminacion) FROM stdin;
2	Combo Ejecutivo	Sopa + Milanesa	45.00	t	\N	2026-07-24 21:37:23.968555	\N	\N
\.


--
-- TOC entry 5189 (class 0 OID 79900)
-- Dependencies: 247
-- Data for Name: compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compra (idcompra, descripcion, codigo, activo, total, fecha, idusuario, idtipocompra) FROM stdin;
\.


--
-- TOC entry 5203 (class 0 OID 80073)
-- Dependencies: 261
-- Data for Name: configuracionrestaurante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configuracionrestaurante (idconfiguracion, nombre, direccion, telefono, logo) FROM stdin;
\.


--
-- TOC entry 5183 (class 0 OID 79851)
-- Dependencies: 241
-- Data for Name: detallecombo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallecombo (iddetallecombo, cantidad, idcombo, idplato, activo, fecha_creacion, fecha_actualizacion, fecha_eliminacion) FROM stdin;
3	1	2	1	t	2026-07-24 21:37:23.968555	\N	\N
4	1	2	2	t	2026-07-24 21:37:23.968555	\N	\N
\.


--
-- TOC entry 5191 (class 0 OID 79925)
-- Dependencies: 249
-- Data for Name: detallecompra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallecompra (iddetalle_compra, cantidad, precio_unitario, subtotal, idcompra, idproducto) FROM stdin;
\.


--
-- TOC entry 5187 (class 0 OID 79881)
-- Dependencies: 245
-- Data for Name: detallemenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallemenu (iddetalle_menu, stock, activo, idmenu, idplato) FROM stdin;
2	10	t	1	2
1	8	f	1	1
\.


--
-- TOC entry 5197 (class 0 OID 79993)
-- Dependencies: 255
-- Data for Name: detallepedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detallepedido (iddetalle, cantidad, precio_unitario, subtotal, observacion, activo, idpedido, idplato, idbebida, idestadopedido) FROM stdin;
2	2	12.00	24.00	\N	t	2	\N	1	1
1	2	35.00	70.00	\N	t	2	1	\N	2
\.


--
-- TOC entry 5167 (class 0 OID 79750)
-- Dependencies: 225
-- Data for Name: estadopedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estadopedido (idestado, nombre, descripcion) FROM stdin;
1	Pendiente	Pedido recién registrado
2	En preparación	La cocina está preparando el pedido
3	Parcialmente entregado	Parte del pedido ya fue entregado
4	Listo	Pedido listo para entregar
5	Entregado	Pedido entregado completamente
6	Cancelado	Pedido cancelado
\.


--
-- TOC entry 5193 (class 0 OID 79945)
-- Dependencies: 251
-- Data for Name: gastoextra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gastoextra (idgasto, codigo, descripcion, fecha, monto, activo, idusuario) FROM stdin;
\.


--
-- TOC entry 5185 (class 0 OID 79869)
-- Dependencies: 243
-- Data for Name: menu_dia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu_dia (idmenu, fecha, estado, codigo_menu) FROM stdin;
1	2026-07-24	CERRADO	6f85322b-3298-457c-b9cb-996615397ff8
\.


--
-- TOC entry 5165 (class 0 OID 79736)
-- Dependencies: 223
-- Data for Name: mesa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mesa (idmesa, codigo, numero, capacidad, disponible) FROM stdin;
1	960489be-9c94-438a-8590-58913446d06d	1	6	t
\.


--
-- TOC entry 5169 (class 0 OID 79759)
-- Dependencies: 227
-- Data for Name: metodopago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metodopago (idmetodopago, nombre, descripcion, activo) FROM stdin;
1	Efectivo	Pago en efectivo	t
2	QR	Pago mediante código QR	t
3	Tarjeta	Pago con tarjeta	t
4	Transferencia	Transferencia bancaria	t
\.


--
-- TOC entry 5201 (class 0 OID 80044)
-- Dependencies: 259
-- Data for Name: modificacionpedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modificacionpedido (idmodificacion, codigo, fecha, descripcion, activo, tipo_modificacion, idpedido, iddetalle, idusuario) FROM stdin;
\.


--
-- TOC entry 5195 (class 0 OID 79966)
-- Dependencies: 253
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido (idpedido, tipo_pedido, fecha_hora, total, idusuario, idmesa, codigo_pedido, idestado) FROM stdin;
2	RESTAURANTE	2026-07-25 06:42:33.850656-04	94.00	1	1	365e6a88-5a36-40af-b17f-cdc0f384c411	1
\.


--
-- TOC entry 5177 (class 0 OID 79808)
-- Dependencies: 235
-- Data for Name: plato; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plato (idplato, nombre, descripcion, precio, activo, fecha_creacion, fecha_actualizacion, fecha_eliminacion, idcategoria) FROM stdin;
1	Milanesa Especial	Con huevo	35.00	t	2026-07-24 21:25:34.170334-04	2026-07-24 21:25:57.197988-04	\N	1
2	Milanesa	Milanesa de res	30.00	t	2026-07-24 21:37:08.179652-04	\N	\N	1
\.


--
-- TOC entry 5175 (class 0 OID 79793)
-- Dependencies: 233
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (idproducto, codigo, nombre, descripcion, activo) FROM stdin;
\.


--
-- TOC entry 5161 (class 0 OID 79704)
-- Dependencies: 219
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (idrol, codigo, nombre, descripcion) FROM stdin;
1	e531c631-405c-4f20-a07b-4799cb8ff992	Administrador	Acceso completo al sistema
2	4d80bd69-c40c-4dec-823a-2e0b1a431d14	Cajero	Gestiona pedidos, ventas y cobros
3	d1345def-c337-48db-93ff-35f7301c9a82	Mesero	Registra y consulta pedidos
4	7c5d7d34-eebd-479e-831d-34f2e618efdb	Cocinero	Gestiona la preparación de pedidos
\.


--
-- TOC entry 5171 (class 0 OID 79768)
-- Dependencies: 229
-- Data for Name: tipocompra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipocompra (idtipocompra, codigo, nombre, descripcion) FROM stdin;
1	8d60a3d1-dfcb-4e5a-bd88-5db772398b24	Ingredientes	Compra de ingredientes
2	b2d0b99c-192b-4d06-b71c-3d83b66f4c0d	Bebidas	Compra de bebidas
3	dbebba35-be77-45cf-98e1-0ac69707bcfc	Limpieza	Productos de limpieza
4	b5d6dd80-78c5-4747-ba6e-72fc64c1a054	Gas	Compra de gas
5	ee12cad1-82df-472b-950a-fde433fbb54a	Otros	Otros gastos de compra
\.


--
-- TOC entry 5163 (class 0 OID 79716)
-- Dependencies: 221
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (idusuario, codigo, username, password, activo, idrol, created_at, updated_at) FROM stdin;
4	USR004	cocina	HASH	t	4	2026-07-24 18:19:43.63556	2026-07-24 18:19:43.63556
1	USR001	admin	$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\\kVbw2fp3USyzxlwHSK	t	1	2026-07-24 18:19:43.63556	2026-07-24 18:19:43.63556
2	USR002	cajero	$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\\kVbw2fp3USyzxlwHSK	t	2	2026-07-24 18:19:43.63556	2026-07-24 18:19:43.63556
3	USR003	mesero	$2b$10$wdnQ.jjKauqj5SI9Omq.hul1WpWYhQrh1N\\kVbw2fp3USyzxlwHSK	t	3	2026-07-24 18:19:43.63556	2026-07-24 18:19:43.63556
\.


--
-- TOC entry 5199 (class 0 OID 80019)
-- Dependencies: 257
-- Data for Name: venta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venta (idventa, codigo, fecha, subtotal, descuento, total, idpedido, idmetodopago) FROM stdin;
1	7c9820e4-5933-47e4-8c17-e48a7046de73	2026-07-25 07:17:28.158805-04	94.00	0.00	94.00	2	1
\.


--
-- TOC entry 5232 (class 0 OID 0)
-- Dependencies: 236
-- Name: bebida_idbebida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bebida_idbebida_seq', 1, true);


--
-- TOC entry 5233 (class 0 OID 0)
-- Dependencies: 230
-- Name: categoria_idcategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_idcategoria_seq', 10, true);


--
-- TOC entry 5234 (class 0 OID 0)
-- Dependencies: 238
-- Name: combo_idcombo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.combo_idcombo_seq', 2, true);


--
-- TOC entry 5235 (class 0 OID 0)
-- Dependencies: 246
-- Name: compra_idcompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compra_idcompra_seq', 1, false);


--
-- TOC entry 5236 (class 0 OID 0)
-- Dependencies: 260
-- Name: configuracionrestaurante_idconfiguracion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuracionrestaurante_idconfiguracion_seq', 1, false);


--
-- TOC entry 5237 (class 0 OID 0)
-- Dependencies: 240
-- Name: detallecombo_iddetallecombo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallecombo_iddetallecombo_seq', 4, true);


--
-- TOC entry 5238 (class 0 OID 0)
-- Dependencies: 248
-- Name: detallecompra_iddetalle_compra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallecompra_iddetalle_compra_seq', 1, false);


--
-- TOC entry 5239 (class 0 OID 0)
-- Dependencies: 244
-- Name: detallemenu_iddetalle_menu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallemenu_iddetalle_menu_seq', 2, true);


--
-- TOC entry 5240 (class 0 OID 0)
-- Dependencies: 254
-- Name: detallepedido_iddetalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallepedido_iddetalle_seq', 2, true);


--
-- TOC entry 5241 (class 0 OID 0)
-- Dependencies: 224
-- Name: estadopedido_idestado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estadopedido_idestado_seq', 6, true);


--
-- TOC entry 5242 (class 0 OID 0)
-- Dependencies: 250
-- Name: gastoextra_idgasto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gastoextra_idgasto_seq', 1, false);


--
-- TOC entry 5243 (class 0 OID 0)
-- Dependencies: 242
-- Name: menu_dia_idmenu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_dia_idmenu_seq', 1, true);


--
-- TOC entry 5244 (class 0 OID 0)
-- Dependencies: 222
-- Name: mesa_idmesa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesa_idmesa_seq', 1, true);


--
-- TOC entry 5245 (class 0 OID 0)
-- Dependencies: 226
-- Name: metodopago_idmetodopago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodopago_idmetodopago_seq', 4, true);


--
-- TOC entry 5246 (class 0 OID 0)
-- Dependencies: 258
-- Name: modificacionpedido_idmodificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modificacionpedido_idmodificacion_seq', 1, false);


--
-- TOC entry 5247 (class 0 OID 0)
-- Dependencies: 252
-- Name: pedido_idpedido_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_idpedido_seq', 2, true);


--
-- TOC entry 5248 (class 0 OID 0)
-- Dependencies: 234
-- Name: plato_idplato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plato_idplato_seq', 2, true);


--
-- TOC entry 5249 (class 0 OID 0)
-- Dependencies: 232
-- Name: producto_idproducto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_idproducto_seq', 1, false);


--
-- TOC entry 5250 (class 0 OID 0)
-- Dependencies: 218
-- Name: rol_idrol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_idrol_seq', 4, true);


--
-- TOC entry 5251 (class 0 OID 0)
-- Dependencies: 228
-- Name: tipocompra_idtipocompra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipocompra_idtipocompra_seq', 5, true);


--
-- TOC entry 5252 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_idusuario_seq', 4, true);


--
-- TOC entry 5253 (class 0 OID 0)
-- Dependencies: 256
-- Name: venta_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venta_idventa_seq', 1, true);


--
-- TOC entry 4935 (class 2606 OID 79836)
-- Name: bebida bebida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida
    ADD CONSTRAINT bebida_pkey PRIMARY KEY (idbebida);


--
-- TOC entry 4918 (class 2606 OID 79787)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (idcategoria);


--
-- TOC entry 4940 (class 2606 OID 79849)
-- Name: combo combo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT combo_pkey PRIMARY KEY (idcombo);


--
-- TOC entry 4952 (class 2606 OID 79911)
-- Name: compra compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (idcompra);


--
-- TOC entry 4985 (class 2606 OID 80080)
-- Name: configuracionrestaurante configuracionrestaurante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracionrestaurante
    ADD CONSTRAINT configuracionrestaurante_pkey PRIMARY KEY (idconfiguracion);


--
-- TOC entry 4942 (class 2606 OID 79857)
-- Name: detallecombo detallecombo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT detallecombo_pkey PRIMARY KEY (iddetallecombo);


--
-- TOC entry 4957 (class 2606 OID 79933)
-- Name: detallecompra detallecompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_pkey PRIMARY KEY (iddetalle_compra);


--
-- TOC entry 4950 (class 2606 OID 79888)
-- Name: detallemenu detallemenu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT detallemenu_pkey PRIMARY KEY (iddetalle_menu);


--
-- TOC entry 4971 (class 2606 OID 80002)
-- Name: detallepedido detallepedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT detallepedido_pkey PRIMARY KEY (iddetalle);


--
-- TOC entry 4904 (class 2606 OID 79755)
-- Name: estadopedido estadopedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido
    ADD CONSTRAINT estadopedido_pkey PRIMARY KEY (idestado);


--
-- TOC entry 4959 (class 2606 OID 79956)
-- Name: gastoextra gastoextra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT gastoextra_pkey PRIMARY KEY (idgasto);


--
-- TOC entry 4944 (class 2606 OID 79875)
-- Name: menu_dia menu_dia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT menu_dia_pkey PRIMARY KEY (idmenu);


--
-- TOC entry 4898 (class 2606 OID 79744)
-- Name: mesa mesa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT mesa_pkey PRIMARY KEY (idmesa);


--
-- TOC entry 4908 (class 2606 OID 79764)
-- Name: metodopago metodopago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (idmetodopago);


--
-- TOC entry 4981 (class 2606 OID 80054)
-- Name: modificacionpedido modificacionpedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT modificacionpedido_pkey PRIMARY KEY (idmodificacion);


--
-- TOC entry 4967 (class 2606 OID 79974)
-- Name: pedido pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (idpedido);


--
-- TOC entry 4933 (class 2606 OID 79818)
-- Name: plato plato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato
    ADD CONSTRAINT plato_pkey PRIMARY KEY (idplato);


--
-- TOC entry 4925 (class 2606 OID 79802)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (idproducto);


--
-- TOC entry 4885 (class 2606 OID 79710)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (idrol);


--
-- TOC entry 4912 (class 2606 OID 79774)
-- Name: tipocompra tipocompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT tipocompra_pkey PRIMARY KEY (idtipocompra);


--
-- TOC entry 4938 (class 2606 OID 79838)
-- Name: bebida uq_bebida_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bebida
    ADD CONSTRAINT uq_bebida_codigo UNIQUE (codigo);


--
-- TOC entry 4920 (class 2606 OID 79789)
-- Name: categoria uq_categoria_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT uq_categoria_codigo UNIQUE (codigo_categoria);


--
-- TOC entry 4922 (class 2606 OID 79791)
-- Name: categoria uq_categoria_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT uq_categoria_nombre UNIQUE (nombre);


--
-- TOC entry 4955 (class 2606 OID 79913)
-- Name: compra uq_compra_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT uq_compra_codigo UNIQUE (codigo);


--
-- TOC entry 4906 (class 2606 OID 79757)
-- Name: estadopedido uq_estado_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadopedido
    ADD CONSTRAINT uq_estado_nombre UNIQUE (nombre);


--
-- TOC entry 4961 (class 2606 OID 79958)
-- Name: gastoextra uq_gasto_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT uq_gasto_codigo UNIQUE (codigo);


--
-- TOC entry 4946 (class 2606 OID 79877)
-- Name: menu_dia uq_menu_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT uq_menu_codigo UNIQUE (codigo_menu);


--
-- TOC entry 4948 (class 2606 OID 79879)
-- Name: menu_dia uq_menu_fecha; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_dia
    ADD CONSTRAINT uq_menu_fecha UNIQUE (fecha);


--
-- TOC entry 4900 (class 2606 OID 79746)
-- Name: mesa uq_mesa_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT uq_mesa_codigo UNIQUE (codigo);


--
-- TOC entry 4902 (class 2606 OID 79748)
-- Name: mesa uq_mesa_numero; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT uq_mesa_numero UNIQUE (numero);


--
-- TOC entry 4910 (class 2606 OID 79766)
-- Name: metodopago uq_metodopago; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT uq_metodopago UNIQUE (nombre);


--
-- TOC entry 4983 (class 2606 OID 80056)
-- Name: modificacionpedido uq_modificacion_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT uq_modificacion_codigo UNIQUE (codigo);


--
-- TOC entry 4969 (class 2606 OID 79976)
-- Name: pedido uq_pedido_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT uq_pedido_codigo UNIQUE (codigo_pedido);


--
-- TOC entry 4927 (class 2606 OID 79804)
-- Name: producto uq_producto_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT uq_producto_codigo UNIQUE (codigo);


--
-- TOC entry 4929 (class 2606 OID 79806)
-- Name: producto uq_producto_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT uq_producto_nombre UNIQUE (nombre);


--
-- TOC entry 4887 (class 2606 OID 79712)
-- Name: rol uq_rol_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_codigo UNIQUE (codigo);


--
-- TOC entry 4889 (class 2606 OID 79714)
-- Name: rol uq_rol_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_nombre UNIQUE (nombre);


--
-- TOC entry 4914 (class 2606 OID 79776)
-- Name: tipocompra uq_tipocompra_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT uq_tipocompra_codigo UNIQUE (codigo);


--
-- TOC entry 4916 (class 2606 OID 79778)
-- Name: tipocompra uq_tipocompra_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocompra
    ADD CONSTRAINT uq_tipocompra_nombre UNIQUE (nombre);


--
-- TOC entry 4892 (class 2606 OID 80122)
-- Name: usuario uq_usuario_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_codigo UNIQUE (codigo);


--
-- TOC entry 4894 (class 2606 OID 79729)
-- Name: usuario uq_usuario_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_usuario UNIQUE (username);


--
-- TOC entry 4977 (class 2606 OID 80032)
-- Name: venta uq_venta_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT uq_venta_codigo UNIQUE (codigo);


--
-- TOC entry 4896 (class 2606 OID 79725)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 4979 (class 2606 OID 80030)
-- Name: venta venta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (idventa);


--
-- TOC entry 4936 (class 1259 OID 80092)
-- Name: idx_bebida_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bebida_nombre ON public.bebida USING btree (nombre);


--
-- TOC entry 4953 (class 1259 OID 80090)
-- Name: idx_compra_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_compra_fecha ON public.compra USING btree (fecha);


--
-- TOC entry 4972 (class 1259 OID 80088)
-- Name: idx_detallepedido_pedido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detallepedido_pedido ON public.detallepedido USING btree (idpedido);


--
-- TOC entry 4973 (class 1259 OID 80089)
-- Name: idx_detallepedido_plato; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detallepedido_plato ON public.detallepedido USING btree (idplato);


--
-- TOC entry 4962 (class 1259 OID 80082)
-- Name: idx_pedido_estado; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_estado ON public.pedido USING btree (idestado);


--
-- TOC entry 4963 (class 1259 OID 80084)
-- Name: idx_pedido_fecha_hora; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_fecha_hora ON public.pedido USING btree (fecha_hora);


--
-- TOC entry 4964 (class 1259 OID 80085)
-- Name: idx_pedido_mesa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_mesa ON public.pedido USING btree (idmesa);


--
-- TOC entry 4965 (class 1259 OID 80083)
-- Name: idx_pedido_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pedido_usuario ON public.pedido USING btree (idusuario);


--
-- TOC entry 4930 (class 1259 OID 80093)
-- Name: idx_plato_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_plato_categoria ON public.plato USING btree (idcategoria);


--
-- TOC entry 4931 (class 1259 OID 80094)
-- Name: idx_plato_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_plato_nombre ON public.plato USING btree (nombre);


--
-- TOC entry 4923 (class 1259 OID 80091)
-- Name: idx_producto_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_producto_nombre ON public.producto USING btree (nombre);


--
-- TOC entry 4890 (class 1259 OID 80081)
-- Name: idx_usuario_rol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuario_rol ON public.usuario USING btree (idrol);


--
-- TOC entry 4974 (class 1259 OID 80086)
-- Name: idx_venta_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_venta_fecha ON public.venta USING btree (fecha);


--
-- TOC entry 4975 (class 1259 OID 80087)
-- Name: idx_venta_pedido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_venta_pedido ON public.venta USING btree (idpedido);


--
-- TOC entry 4988 (class 2606 OID 80136)
-- Name: combo fk_combo_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT fk_combo_menu FOREIGN KEY (idmenu) REFERENCES public.menu_dia(idmenu);


--
-- TOC entry 4993 (class 2606 OID 79919)
-- Name: compra fk_compra_tipocompra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_compra_tipocompra FOREIGN KEY (idtipocompra) REFERENCES public.tipocompra(idtipocompra) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4994 (class 2606 OID 79914)
-- Name: compra fk_compra_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_compra_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4989 (class 2606 OID 79858)
-- Name: detallecombo fk_detallecombo_combo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT fk_detallecombo_combo FOREIGN KEY (idcombo) REFERENCES public.combo(idcombo) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4990 (class 2606 OID 79863)
-- Name: detallecombo fk_detallecombo_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecombo
    ADD CONSTRAINT fk_detallecombo_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4995 (class 2606 OID 79934)
-- Name: detallecompra fk_detallecompra_compra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT fk_detallecompra_compra FOREIGN KEY (idcompra) REFERENCES public.compra(idcompra) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4996 (class 2606 OID 79939)
-- Name: detallecompra fk_detallecompra_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT fk_detallecompra_producto FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4991 (class 2606 OID 79889)
-- Name: detallemenu fk_detallemenu_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT fk_detallemenu_menu FOREIGN KEY (idmenu) REFERENCES public.menu_dia(idmenu) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4992 (class 2606 OID 79894)
-- Name: detallemenu fk_detallemenu_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallemenu
    ADD CONSTRAINT fk_detallemenu_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5001 (class 2606 OID 80013)
-- Name: detallepedido fk_detallepedido_bebida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_bebida FOREIGN KEY (idbebida) REFERENCES public.bebida(idbebida) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5002 (class 2606 OID 80131)
-- Name: detallepedido fk_detallepedido_estadopedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_estadopedido FOREIGN KEY (idestadopedido) REFERENCES public.estadopedido(idestado);


--
-- TOC entry 5003 (class 2606 OID 80003)
-- Name: detallepedido fk_detallepedido_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5004 (class 2606 OID 80008)
-- Name: detallepedido fk_detallepedido_plato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT fk_detallepedido_plato FOREIGN KEY (idplato) REFERENCES public.plato(idplato) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4997 (class 2606 OID 79959)
-- Name: gastoextra fk_gasto_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gastoextra
    ADD CONSTRAINT fk_gasto_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5007 (class 2606 OID 80062)
-- Name: modificacionpedido fk_modificacion_detalle; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_detalle FOREIGN KEY (iddetalle) REFERENCES public.detallepedido(iddetalle) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5008 (class 2606 OID 80057)
-- Name: modificacionpedido fk_modificacion_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5009 (class 2606 OID 80067)
-- Name: modificacionpedido fk_modificacion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modificacionpedido
    ADD CONSTRAINT fk_modificacion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4998 (class 2606 OID 79987)
-- Name: pedido fk_pedido_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_estado FOREIGN KEY (idestado) REFERENCES public.estadopedido(idestado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4999 (class 2606 OID 79982)
-- Name: pedido fk_pedido_mesa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_mesa FOREIGN KEY (idmesa) REFERENCES public.mesa(idmesa) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5000 (class 2606 OID 79977)
-- Name: pedido fk_pedido_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4987 (class 2606 OID 79819)
-- Name: plato fk_plato_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plato
    ADD CONSTRAINT fk_plato_categoria FOREIGN KEY (idcategoria) REFERENCES public.categoria(idcategoria) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4986 (class 2606 OID 79730)
-- Name: usuario fk_usuario_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (idrol) REFERENCES public.rol(idrol) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5005 (class 2606 OID 80038)
-- Name: venta fk_venta_metodopago; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT fk_venta_metodopago FOREIGN KEY (idmetodopago) REFERENCES public.metodopago(idmetodopago) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5006 (class 2606 OID 80033)
-- Name: venta fk_venta_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT fk_venta_pedido FOREIGN KEY (idpedido) REFERENCES public.pedido(idpedido) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2026-07-25 08:04:31

--
-- PostgreSQL database dump complete
--

