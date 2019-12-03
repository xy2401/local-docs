DROP TABLE C_customerinventory;
CREATE TABLE C_customerinventory
  (ci_id 		integer not null,
   ci_itemid 	char(20),
   ci_quantity	integer,             
   ci_customerid	integer,
   ci_value 		numeric(12,2));

CREATE UNIQUE INDEX C_ci_idx ON C_customerinventory(ci_id);

DROP TABLE C_customer;
CREATE TABLE C_customer
(
	c_id		integer not null,
	c_first		char(16),
	c_last		char(16),
	c_street1	char(20),	
	c_street2	char(20),	
	c_city		char(20),	
	c_state		char(2),	
	c_country	char(10),	
	c_zip		char(9),	
	c_phone		char(16),
	c_contact	char(25),	
	c_since		date,
	c_balance	numeric(12,2),
	c_credit	char(2),
	c_credit_limit	numeric(12,2),
	c_ytd_payment	numeric(12,2)
);

CREATE UNIQUE INDEX C_c_idx ON C_customer (c_id);

DROP TABLE C_supplier;
CREATE TABLE C_supplier
(
	supp_id			integer not null,
	supp_name		char(16),
	supp_street1	char(20),	
	supp_street2	char(20),	
	supp_city		char(20),	
	supp_state		char(2),	
	supp_country	char(10),	
	supp_zip		char(9),	
	supp_phone		char(16),
	supp_contact	char(25)
);

CREATE UNIQUE INDEX C_supp_idx ON C_supplier (supp_id);

DROP TABLE C_site;
CREATE TABLE C_site
(
	site_id			integer not null,
	site_name		char(16),
	site_street1	char(20),	
	site_street2	char(20),	
	site_city		char(20),	
	site_state		char(2),	
	site_country	char(10),	
	site_zip		char(9)
);

CREATE UNIQUE INDEX C_site_idx ON C_site (site_id);

DROP TABLE C_parts;
CREATE TABLE C_parts
(
	p_id			char(20) not null,
	p_name			char(35),
	p_desc			varchar(100),
	p_rev			char(6),
	p_unit			char(10),
	p_cost			numeric(12,2),
	p_price			numeric(12,2),
	p_planner		integer,
	p_type			integer,
	p_ind			integer,
        p_lomark                integer,
        p_himark                integer
);

CREATE UNIQUE INDEX C_p_idx ON C_parts (p_id);
DROP TABLE M_parts;
CREATE TABLE M_parts
(
	p_id			char(20) not null,
	p_name			char(35),
	p_desc			varchar(100),
	p_rev			char(6),
	p_planner		integer,
	p_type			integer,
	p_ind			integer,
	p_lomark		integer,
	p_himark		integer
);

CREATE UNIQUE INDEX M_parts_idx ON M_parts (p_id);

DROP TABLE M_bom;
CREATE TABLE M_bom
(
	b_comp_id		char(20) not null,
	b_assembly_id		char(20) not null,
	b_line_no		integer,
	b_qty			integer,
	b_ops			integer,	
	b_eng_change		char(10),	
	b_ops_desc		varchar(100)
);

CREATE UNIQUE INDEX M_bom_idx ON M_bom (b_assembly_id, b_comp_id, b_line_no);

DROP TABLE M_workorder;
CREATE TABLE M_workorder
(
	wo_number		integer not null,
	wo_o_id			integer,
	wo_ol_id		integer,
	wo_status		integer,
	wo_assembly_id	char(20),
	wo_orig_qty		integer,
	wo_comp_qty		integer,
	wo_due_date		date,
	wo_start_date		timestamp
);

CREATE UNIQUE INDEX M_wo_idx ON M_workorder (wo_number);

DROP TABLE M_largeorder;
CREATE TABLE M_largeorder
(
	lo_id			integer not null,
	lo_o_id			integer,
	lo_ol_id		integer,
	lo_assembly_id	char(20),
	lo_qty			integer,
	lo_due_date		date,
        lo_category             integer
);

DROP TABLE M_inventory;
CREATE TABLE M_inventory
(
	in_p_id			char(20) not null,
	in_qty			integer,
	in_ordered		integer,
	in_location		char(20),	
	in_acc_code		integer,
	in_act_date		date
);

CREATE UNIQUE INDEX M_inv_idx ON M_inventory (in_p_id);
DROP TABLE O_orders;
CREATE TABLE O_orders
(
	o_id		integer not null,        
	o_c_id		integer,
	o_ol_cnt	integer,
	o_discount	numeric(4,2),
	o_total		numeric(12,2),
	o_status	integer,
	o_entry_date	timestamp,
	o_ship_date	date
);

CREATE UNIQUE INDEX O_ords_idx ON O_orders (o_id);

CREATE INDEX O_oc_idx ON O_orders (o_c_id);

DROP TABLE O_orderline;
CREATE TABLE O_orderline
(
	ol_id		integer not null,
	ol_o_id		integer not null,
	ol_i_id		char(20),
	ol_qty		integer,
      ol_total_value    numeric(12,2),
   ol_msrp         numeric(12,2),
	ol_status	integer,
	ol_ship_date	date
);

CREATE UNIQUE INDEX O_ordl_idx ON O_orderline (ol_o_id, ol_id);

DROP TABLE O_item;
CREATE TABLE O_item
(
	i_id			char(20) not null,
	i_name			char(35),
	i_desc			varchar(100),
	i_price			numeric(12,2),
	i_discount		numeric(6,4),
        i_category		integer not null
);

CREATE UNIQUE INDEX O_i_idx ON O_item (i_id);
CREATE INDEX O_icat_idx ON O_item (i_category);

DROP TABLE S_component;
CREATE TABLE S_component      
(
	comp_id			char(20) not null,
	comp_name		char(10),
	comp_desc		varchar(100),
	comp_unit		char(10),
	comp_cost		numeric(12,2),
	qty_on_order		integer,
	qty_demanded		integer,
	lead_time		integer,
	container_size		integer
);

CREATE UNIQUE INDEX S_comp_idx ON S_component (comp_id);

DROP TABLE S_supp_component;
CREATE TABLE S_supp_component
(
	sc_p_id			char(20) not null,
	sc_supp_id		integer not null,
	sc_price		numeric(12,2),
	sc_qty			integer,
	sc_discount		numeric(6,4),
	sc_del_date		integer
);

CREATE UNIQUE INDEX S_sc_idx ON S_supp_component (sc_p_id, sc_supp_id);

DROP TABLE S_supplier;
CREATE TABLE S_supplier
(
	supp_id			integer not null,
	supp_name		char(16),
	supp_street1	char(20),	
	supp_street2	char(20),	
	supp_city		char(20),	
	supp_state		char(2),	
	supp_country	char(10),	
	supp_zip		char(9),	
	supp_phone		char(16),
	supp_contact	char(25)
);

CREATE UNIQUE INDEX S_supp_idx ON S_supplier (supp_id);

DROP TABLE S_site;
CREATE TABLE S_site
(
	site_id			integer not null,
	site_name		char(16),
	site_street1	char(20),	
	site_street2	char(20),	
	site_city		char(20),	
	site_state		char(2),	
	site_country	char(10),	
	site_zip		char(9)
);

CREATE UNIQUE INDEX S_site_idx ON S_site (site_id);

DROP TABLE S_purchase_order;
CREATE TABLE S_purchase_order
(
	po_number		integer not null,
	po_supp_id		integer,
	po_site_id		integer
);

CREATE UNIQUE INDEX S_po_idx ON S_purchase_order (po_number);

DROP TABLE S_purchase_orderline;
CREATE TABLE S_purchase_orderline
(
	pol_number		integer not null,
	pol_po_id		integer not null,
	pol_p_id		char(20),
	pol_qty			integer,
	pol_balance		numeric(12,2),
	pol_deldate		date,
	pol_message		varchar(100)
);

CREATE UNIQUE INDEX S_pol_idx ON S_purchase_orderline (pol_po_id, pol_number);

DROP TABLE U_sequences;
CREATE TABLE U_sequences
(
	s_id		varchar(50) not null,
	s_nextnum	integer,
	s_blocksize	integer
);

CREATE UNIQUE INDEX U_s_idx ON U_sequences (s_id);
