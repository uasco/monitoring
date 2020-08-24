CREATE DEFINER=`root`@`%` PROCEDURE `detect_rain_alarm`(in cl_id int,in ch_index int, in n int,in h int, out alarm bool)
BEGIN
   DECLARE last_rec_time datetime;
   declare val,last_val decimal(8,2);
   select value from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 1 into last_val;
   select sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 1 into last_rec_time;
   SELECT value FROM sample_values where client_id=cl_id and channel_index=ch_index and  TIMESTAMPDIFF(MINUTE,sample_time , last_rec_time)>=n ORDER BY sample_time desc limit 1 into val ;
   if (last_val-val)>h then
      set alarm = true;
   else
	  set alarm = false;
   end if;

END
--
set @alarm = 0;
call detect_rain_alarm(100, 24, 5, 0.1, @alarm);
select @alarm;
--
CREATE DEFINER=`root`@`%` PROCEDURE `detect_rain_start`(in cl_id int,in ch_index int ,out result bool)
BEGIN
	declare  last_val,pre_last_val decimal(8,2);
	select value from(select * from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 2) table_alias order by sample_time desc limit 1 into last_val;
	select value from(select * from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 2) table_alias order by sample_time asc limit 1 into pre_last_val;
   if (last_val-pre_last_val)>0 then
      set result = true;
	else
	  set result = false;
   end if;
END
--
set @result = 0;
call detect_rain_start(100, 24, @result);
select @result;
--
CREATE DEFINER=`root`@`%` PROCEDURE `get_val_for_alarm`(in cl_id int,in ch_index int, in n int, out v DECIMAL(8,2))
BEGIN
   DECLARE last_rec_time datetime;
   select sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 1 into last_rec_time;
   SELECT value FROM sample_values where client_id=cl_id and channel_index=ch_index and  TIMESTAMPDIFF(MINUTE,sample_time , last_rec_time)>=n ORDER BY sample_time desc limit 1 into v ;
END
--
call get_val_for_alarm(114,24,120,@v);
select @v;
--
CREATE DEFINER=`root`@`%` PROCEDURE `detect_flood`(in cl_id int,in ch_index int,in h float, out alarm bool)
BEGIN
   DECLARE lv,plv float;
   declare val,last_val decimal(8,2);
   create temporary table tt as select  value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 2 ;
   select value from tt limit 1 into lv ;
   select value from tt order by sample_time limit 1 into plv;
   if (lv-plv)>h then
      set alarm = true;
   else
	  set alarm = false;
   end if;
  drop table tt;
END
--
call detect_flood(136,74,0.2,@alarm);
select @alarm;
--
CREATE DEFINER=`rails`@`%` PROCEDURE `detect_flood_stop`(in cl_id int,in ch_index int,in n int,in h float, out flood_stop bool)
BEGIN
   declare diff_val float DEFAULT 0.0;
   DECLARE finished INTEGER DEFAULT 0;
   DECLARE cursor_i CURSOR FOR SELECT diff FROM yourtable;
   DECLARE CONTINUE HANDLER
        FOR NOT FOUND SET finished = 1;
   create temporary table tt as select  value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit n ;
   create temporary table tt2 as select * from tt;
   create temporary table  yourtable as select tt.*,COALESCE(tt.value - (select tt2.value
                  from tt2
                  where tt2.sample_time < tt.sample_time
                  order by tt2.sample_time desc
                  limit 1
                 )
       ) as diff
   from  tt ;
    OPEN cursor_i;
    set flood_stop = true;
    loop_label:  LOOP
 	 FETCH cursor_i INTO diff_val;
     IF finished = 1 THEN
			LEAVE loop_label;
	 END IF;
    if (diff_val >= h) then
		set flood_stop = false;
        LEAVE  loop_label;
     end if;
   END loop;
   CLOSE cursor_i;
    drop table tt;
    drop table tt2;
    drop table yourtable;
END
--
set @flood_stop = 0;
call detect_flood_stop(136, 74, 5, 0.2, @flood_stop);
select @flood_stop;
--
CREATE DEFINER=`root`@`%` PROCEDURE `amari_report`(in cl_id int,in ch_index int ,in start_time datetime,in end_time datetime,in period int)
BEGIN
DECLARE t_value float;
DECLARE t_sample_time datetime;
DECLARE pre_start_time datetime;
set pre_start_time = DATE_SUB(start_time, INTERVAL period MINUTE);
create temporary table tt as select value, sample_time from sample_values where client_id=cl_id and channel_index=ch_index and  sample_time between pre_start_time  and end_time ;
create temporary table yourtable (value float,sample_time datetime);
 loop_label:  LOOP
 if (pre_start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt  where  sample_time between pre_start_time and DATE_ADD(pre_start_time, INTERVAL period MINUTE) ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
-- SELECT value , sample_time FROM sample_values  where client_id=cl_id and channel_index=ch_index and  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
 if FOUND_ROWS() > 0 then
 insert into yourtable(value,sample_time) values (t_value, t_sample_time);
 end if;
 set pre_start_time = DATE_ADD(pre_start_time, INTERVAL period MINUTE);
 END loop;
select * from yourtable;
drop table yourtable;
drop table tt;
END
--
call amari_report(103,24,'2020-06-21 00:00:00','2020-06-26 23:59:59',60);
--
CREATE DEFINER=`root`@`%` PROCEDURE `mantaghei_report`(in cl_id int,in ch_index int ,in start_time datetime,in end_time datetime)
BEGIN
DECLARE val_0 float DEFAULT 0.0;
DECLARE val_6_30 float DEFAULT 0.0;
DECLARE val_18_30 float DEFAULT 0.0;
DECLARE val_24_00 float DEFAULT 0.0;
DECLARE time_0 datetime DEFAULT '2020-01-01';
DECLARE time_6_30 datetime DEFAULT '2020-01-01';
DECLARE time_18_30 datetime DEFAULT '2020-01-01';
DECLARE time_24_00 datetime DEFAULT '2020-01-01';

create temporary table tt as select value, sample_time from sample_values where client_id=cl_id and channel_index=ch_index and  sample_time between start_time  and end_time ;

create temporary table yourtable (val_0 float, time_0 datetime, val_6_30 float, time_6_30 datetime, val_18_30 float, time_18_30 datetime, val_24_00 float, time_24_00 datetime);
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 select value , sample_time from tt where  sample_time between start_time and  DATE_ADD(start_time, INTERVAL 390 MINUTE) order by sample_time asc limit 1 into val_0 , time_0;
 if FOUND_ROWS() = 0 then
 set val_0 = 0;
 set time_0 = '1111-11-11';
 end if;
select value , sample_time from tt where  sample_time between start_time and  DATE_ADD(start_time, INTERVAL 390 MINUTE) order by sample_time desc limit 1 into val_6_30 , time_6_30;
if FOUND_ROWS() = 0 then
 set val_6_30 = 0;
 set time_6_30 = '1111-11-11';
 end if;
select value , sample_time from tt where  sample_time between DATE_ADD(start_time, INTERVAL 390 MINUTE) and DATE_ADD(start_time, INTERVAL 1110 MINUTE) order by sample_time desc limit 1 into val_18_30 , time_18_30;
if FOUND_ROWS() = 0 then
 set val_18_30 = 0;
 set time_18_30 = '1111-11-11';
 end if;
select value , sample_time from tt where  sample_time between DATE_ADD(start_time, INTERVAL 1110 MINUTE) and DATE_ADD(start_time, INTERVAL 1440 MINUTE) order by sample_time desc limit 1 into val_24_00 , time_24_00;
if FOUND_ROWS() = 0 then
  set val_24_00 = 0;
 set time_24_00 = '1111-11-11';
 end if;
 insert into yourtable(val_0 , time_0 , val_6_30 , time_6_30 , val_18_30 , time_18_30 , val_24_00 , time_24_00) values (val_0 , time_0 , val_6_30 , time_6_30 , val_18_30 , time_18_30 , val_24_00 , time_24_00);
 set start_time = DATE_ADD(start_time, INTERVAL 1 day);
 END loop;
select * from yourtable;
drop table yourtable;
drop table tt;
END

-----
call uasco.mantaghei_report(103,24,'2020-06-21 00:00:00','2020-06-26 23:59:59');
-----


CREATE DEFINER=`root`@`%` PROCEDURE `detect_rain_start2`(in cl_id int,in ch_index int ,in difftime int,out result bool)
BEGIN
	declare  last_val,pre_last_val decimal(8,2);
    declare last_time, pre_last_time datetime;
	select value from(select * from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 2) table_alias order by sample_time desc limit 1 into last_val;
	select value from(select * from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 2) table_alias order by sample_time asc limit 1 into pre_last_val;
    select value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 1 into last_val , last_time;
    set pre_last_time = DATE_SUB(last_time, INTERVAL difftime MINUTE);
    select value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index and sample_time <= pre_last_time order by sample_time desc limit 1 into pre_last_val , pre_last_time;

   if (last_val-pre_last_val)>=0.15 then
      set result = true;
	else
	  set result = false;
   end if;
END

---
set @result = 0;
call detect_rain_start2(114, 24, 120, @result);
select @result;
---
CREATE DEFINER=`root`@`%` PROCEDURE `detect_flood_2`(in cl_id int,in ch_index int,in n int,in h float, out flood bool,out start_flood datetime)
BEGIN
   DECLARE v1 , v2 decimal(8,2);
   DECLARE t1, t2 datetime;
   DECLARE l int;
   create temporary table tt as select  value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit n ;
   set l = n;
   loop_label:  LOOP
   if (l <= 1) then
   LEAVE  loop_label;
   end if;

   select value , sample_time from  (select value , sample_time from tt order by sample_time desc limit l) as alias1 order by sample_time asc limit 1 into v1 , t1;
   set l = l-1;
   select value , sample_time from  (select value , sample_time from tt order by sample_time desc limit l) as alias2 order by sample_time asc limit 1 into v2 , t2;
   if (v2-v1)>h then
      set flood = true;
      set start_flood = t2;
       LEAVE  loop_label;
   else
	  set flood = false;
   end if;

   END loop;


  drop table tt;
END
---
set @alarm = 0;
set @start_flood = '0';
call detect_flood_2(136, 74, 7, 0.2, @alarm, @start_flood);
select @flood, @start_flood;
---
CREATE DEFINER=`root`@`%` PROCEDURE `detect_flood_stop_2`(in cl_id int,in ch_index int,in h float, in start_flood datetime , out flood_stop bool,out s_f datetime)
BEGIN
   DECLARE v1 , v2 decimal(8,2);
   DECLARE t1, t2 datetime;
   DECLARE l ,n int;
   create temporary table tt as select  value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index and sample_time >= start_flood order by sample_time asc ;
   select count(*) from tt into n;
   set l = n;
   loop_label:  LOOP
   if (l <= 1) then
   LEAVE  loop_label;
   end if;

   select value , sample_time from  (select value , sample_time from tt order by sample_time desc limit n) as alias1 order by sample_time asc limit 1 into v1 , t1;
   set l = l-1;
   select value , sample_time from  (select value , sample_time from tt order by sample_time desc limit l) as alias2 order by sample_time asc limit 1 into v2 , t2;
   if (v2-v1)>h then
      set flood_stop = false;
      set s_f = t2;
      LEAVE  loop_label;
   else
	  set flood_stop = true;
      set s_f = t1;
   end if;

   END loop;


  drop table tt;
END
---
set @flood_stop = 0;
set @s_f = '0';
call uasco.detect_flood_stop_2(136, 74, 0.2, '2020-08-02 07:04:00', @flood_stop, @s_f);
select @flood_stop, @s_f;
---
CREATE DEFINER=`root`@`%` PROCEDURE `clima_mantaghei_report`(in cl_id int,in sensores_indexes varchar(255) ,in start_time datetime,in end_time datetime)
BEGIN
 DECLARE evp_a int;
 DECLARE rainc_t int;
 DECLARE tmp_l int;
 DECLARE tmp_n int;
 DECLARE tmp_x int;
 DECLARE hum_l int;
 DECLARE evp_a_6_30_val decimal(8,2);
 DECLARE evp_a_18_30_val decimal(8,2);
 DECLARE rainc_t_6_30_val decimal(8,2);
 DECLARE rainc_t_18_30_val decimal(8,2);
 DECLARE tmp_n_6_30_val decimal(8,2);
 DECLARE tmp_x_18_30_val decimal(8,2);
 DECLARE tmp_l_6_30_val decimal(8,2);
 DECLARE tmp_l_12_30_val decimal(8,2);
 DECLARE tmp_l_18_30_val decimal(8,2);
 DECLARE hum_l_6_30_val decimal(8,2);
 DECLARE hum_l_12_30_val decimal(8,2);
 DECLARE hum_l_18_30_val decimal(8,2);
 DECLARE t_val_1 decimal(8,2);
 DECLARE t_val_2 decimal(8,2);
 DECLARE t_val_3 decimal(8,2);
 DECLARE t_val_4 decimal(8,2);
 set start_time = DATE_SUB(start_time, INTERVAL 1 day);
 SELECT JSON_EXTRACT(sensores_indexes, '$.evp_a') into evp_a;
 SELECT JSON_EXTRACT(sensores_indexes, '$.rainc_t') into rainc_t;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_l') into tmp_l;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_n') into tmp_n;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_x') into tmp_x;
 SELECT JSON_EXTRACT(sensores_indexes, '$.hum_l') into hum_l;
 create temporary table tt as select value, sample_time , channel_index from sample_values where client_id=cl_id and channel_index in (evp_a,rainc_t,tmp_l,tmp_n,tmp_x,hum_l) and  sample_time between start_time  and end_time ;
 create temporary table yourtable (evp_a_6_30 decimal(8,2),evp_a_18_30 decimal(8,2),rainc_t_6_30 decimal(8,2),rainc_t_18_30 decimal(8,2),tmp_n_6_30 decimal(8,2),tmp_x_18_30 decimal(8,2),tmp_l_6_30 decimal(8,2),hum_l_6_30 decimal(8,2),tmp_l_12_30 decimal(8,2),hum_l_12_30 decimal(8,2),tmp_l_18_30 decimal(8,2),hum_l_18_30 decimal(8,2),sample_time datetime);

 loop_label:  LOOP
 if (start_time >= end_time) then
 LEAVE  loop_label;
 end if;
 SELECT AVG(value)  FROM tt  where  sample_time between DATE_ADD(start_time, INTERVAL 1110 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and channel_index = evp_a  into evp_a_6_30_val;
 SELECT AVG(value)  FROM tt  where  sample_time between DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = evp_a  into evp_a_18_30_val;

 SELECT value  FROM tt  where  sample_time >=  DATE_ADD(start_time, INTERVAL 1110 minute) and channel_index = rainc_t ORDER BY sample_time DESC limit 1  into t_val_1;
 SELECT value  FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and channel_index = rainc_t ORDER BY sample_time DESC limit 1  into t_val_2;
 SELECT value  FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = rainc_t ORDER BY sample_time DESC limit 1  into t_val_3;
	set rainc_t_6_30_val=t_val_2 - t_val_1;
    set rainc_t_18_30_val=t_val_3 - t_val_2;

  SELECT MIN(value) FROM tt  where  sample_time between DATE_ADD(start_time, INTERVAL 390 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and channel_index = tmp_n into tmp_n_6_30_val;
  SELECT MAX(value) FROM tt  where  sample_time between DATE_ADD(start_time, INTERVAL 1110 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = tmp_x into tmp_x_18_30_val;

  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and channel_index = tmp_l ORDER BY sample_time DESC limit 1  into tmp_l_6_30_val;
  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and channel_index = hum_l ORDER BY sample_time DESC limit 1  into hum_l_6_30_val;
  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 750 minute) and channel_index = tmp_l ORDER BY sample_time DESC limit 1  into tmp_l_12_30_val;
  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 750 minute) and channel_index = hum_l ORDER BY sample_time DESC limit 1  into hum_l_12_30_val;
  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = tmp_l ORDER BY sample_time DESC limit 1  into tmp_l_18_30_val;
  SELECT value FROM tt  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = hum_l ORDER BY sample_time DESC limit 1  into hum_l_18_30_val;



 insert into yourtable(evp_a_6_30,evp_a_18_30,rainc_t_6_30,rainc_t_18_30,tmp_n_6_30,tmp_x_18_30,tmp_l_6_30,hum_l_6_30,tmp_l_12_30 ,hum_l_12_30 ,tmp_l_18_30 ,hum_l_18_30 ,sample_time) values (evp_a_6_30_val,evp_a_18_30_val,rainc_t_6_30_val,rainc_t_18_30_val,tmp_n_6_30_val,tmp_x_18_30_val,tmp_l_6_30_val,hum_l_6_30_val,tmp_l_12_30_val,hum_l_12_30_val,tmp_l_18_30_val,hum_l_18_30_val, DATE_ADD(start_time, INTERVAL 1 day));
 set start_time = DATE_ADD(start_time, INTERVAL 1 DAY);
 END loop;
  select * from yourtable;
 drop table yourtable;
 drop table tt;
END
---
CREATE DEFINER=`root`@`%` PROCEDURE `clima_mantaghei_report`(in cl_id int,in sensores_indexes varchar(255) ,in start_time datetime,in end_time datetime)
BEGIN
 DECLARE evp_a int;
 DECLARE rainc_t int;
 DECLARE tmp_l int;
 DECLARE tmp_n int;
 DECLARE tmp_x int;
 DECLARE hum_l int;
 DECLARE evp_a_6_30_val decimal(8,2);
 DECLARE evp_a_18_30_val decimal(8,2);
 DECLARE rainc_t_6_30_val decimal(8,2);
 DECLARE rainc_t_18_30_val decimal(8,2);
 DECLARE tmp_n_6_30_val decimal(8,2);
 DECLARE tmp_x_18_30_val decimal(8,2);
 DECLARE tmp_l_6_30_val decimal(8,2);
 DECLARE tmp_l_12_30_val decimal(8,2);
 DECLARE tmp_l_18_30_val decimal(8,2);
 DECLARE hum_l_6_30_val decimal(8,2);
 DECLARE hum_l_12_30_val decimal(8,2);
 DECLARE hum_l_18_30_val decimal(8,2);
 DECLARE t_val_1 decimal(8,2);
 DECLARE t_val_2 decimal(8,2);
 DECLARE t_val_3 decimal(8,2);
 DECLARE t_val_4 decimal(8,2);
 set start_time = DATE_SUB(start_time, INTERVAL 1 day);
 SELECT JSON_EXTRACT(sensores_indexes, '$.evp_a') into evp_a;
 SELECT JSON_EXTRACT(sensores_indexes, '$.rainc_t') into rainc_t;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_l') into tmp_l;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_n') into tmp_n;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp_x') into tmp_x;
 SELECT JSON_EXTRACT(sensores_indexes, '$.hum_l') into hum_l;
 create temporary table tt as select value, sample_time , channel_index from sample_values where client_id=cl_id and channel_index in (evp_a,rainc_t,tmp_l,tmp_n,tmp_x,hum_l) and  sample_time between start_time  and end_time ;
 create temporary table tt_evp_a as select value, sample_time , channel_index from tt where channel_index =evp_a and  sample_time between start_time  and end_time ;
 create temporary table tt_rainc_t as select value, sample_time , channel_index from tt where channel_index =rainc_t and  sample_time between start_time  and end_time ;
 create temporary table tt_tmp_l as select value, sample_time , channel_index from tt where channel_index =tmp_l and  sample_time between start_time  and end_time ;
 create temporary table tt_tmp_n as select value, sample_time , channel_index from tt where channel_index =tmp_n and  sample_time between start_time  and end_time ;
 create temporary table tt_tmp_x as select value, sample_time , channel_index from tt where channel_index =tmp_x and  sample_time between start_time  and end_time ;
 create temporary table tt_hum_l as select value, sample_time , channel_index from tt where channel_index =hum_l and  sample_time between start_time  and end_time ;
 create temporary table yourtable (evp_a_6_30 decimal(8,2),evp_a_18_30 decimal(8,2),rainc_t_6_30 decimal(8,2),rainc_t_18_30 decimal(8,2),tmp_n_6_30 decimal(8,2),tmp_x_18_30 decimal(8,2),tmp_l_6_30 decimal(8,2),hum_l_6_30 decimal(8,2),tmp_l_12_30 decimal(8,2),hum_l_12_30 decimal(8,2),tmp_l_18_30 decimal(8,2),hum_l_18_30 decimal(8,2),sample_time datetime);

 loop_label:  LOOP
 if (start_time >= end_time) then
 LEAVE  loop_label;
 end if;
 SELECT AVG(value)  FROM tt_evp_a  where  sample_time between DATE_ADD(start_time, INTERVAL 1110 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) into evp_a_6_30_val;
 SELECT AVG(value)  FROM tt_evp_a  where  sample_time between DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) and channel_index = evp_a  into evp_a_18_30_val;

 SELECT value  FROM tt_rainc_t  where  sample_time >=  DATE_ADD(start_time, INTERVAL 1110 minute)  ORDER BY sample_time DESC limit 1  into t_val_1;
 SELECT value  FROM tt_rainc_t  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute)  ORDER BY sample_time DESC limit 1  into t_val_2;
 SELECT value  FROM tt_rainc_t  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute)  ORDER BY sample_time DESC limit 1  into t_val_3;
	set rainc_t_6_30_val=t_val_2 - t_val_1;
    set rainc_t_18_30_val=t_val_3 - t_val_2;

  SELECT MIN(value) FROM tt_tmp_n  where  sample_time between DATE_ADD(start_time, INTERVAL 390 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute) into tmp_n_6_30_val;
  SELECT MAX(value) FROM tt_tmp_x  where  sample_time between DATE_ADD(start_time, INTERVAL 1110 minute) and DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) into tmp_x_18_30_val;

  SELECT value FROM tt_tmp_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute)  ORDER BY sample_time DESC limit 1  into tmp_l_6_30_val;
  SELECT value FROM tt_hum_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 390 minute)  ORDER BY sample_time DESC limit 1  into hum_l_6_30_val;
  SELECT value FROM tt_tmp_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 750 minute)  ORDER BY sample_time DESC limit 1  into tmp_l_12_30_val;
  SELECT value FROM tt_hum_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 750 minute)  ORDER BY sample_time DESC limit 1  into hum_l_12_30_val;
  SELECT value FROM tt_tmp_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) ORDER BY sample_time DESC limit 1  into tmp_l_18_30_val;
  SELECT value FROM tt_hum_l  where  sample_time >= DATE_ADD((DATE_ADD(start_time, INTERVAL 1 day)), INTERVAL 1110 minute) ORDER BY sample_time DESC limit 1  into hum_l_18_30_val;



 insert into yourtable(evp_a_6_30,evp_a_18_30,rainc_t_6_30,rainc_t_18_30,tmp_n_6_30,tmp_x_18_30,tmp_l_6_30,hum_l_6_30,tmp_l_12_30 ,hum_l_12_30 ,tmp_l_18_30 ,hum_l_18_30 ,sample_time) values (evp_a_6_30_val,evp_a_18_30_val,rainc_t_6_30_val,rainc_t_18_30_val,tmp_n_6_30_val,tmp_x_18_30_val,tmp_l_6_30_val,hum_l_6_30_val,tmp_l_12_30_val,hum_l_12_30_val,tmp_l_18_30_val,hum_l_18_30_val, DATE_ADD(start_time, INTERVAL 1 day));
 set start_time = DATE_ADD(start_time, INTERVAL 1 DAY);
 END loop;
  select * from yourtable;
 drop table yourtable;
 drop table tt;
 drop table tt_evp_a;
 drop table tt_rainc_t;
 drop table tt_tmp_n;
 drop table tt_tmp_x;
 drop table tt_tmp_l;
 drop table tt_hum_l;
END
---
CREATE DEFINER=`root`@`%` PROCEDURE `clima_amari_report`(in cl_id int,in sensores_indexes varchar(255) ,in start_time datetime,in end_time datetime,in period int)
BEGIN
 DECLARE tmp int;
 DECLARE wsp int;
 DECLARE hum int;
 DECLARE evp int;
 DECLARE wdr int;
 DECLARE rad int;
 DECLARE prs int;
 DECLARE t_value float;
 DECLARE t_sample_time datetime;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp') into tmp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.wsp') into wsp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.hum') into hum;
 SELECT JSON_EXTRACT(sensores_indexes, '$.evp') into evp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.wdr') into wdr;
 SELECT JSON_EXTRACT(sensores_indexes, '$.rad') into rad;
 SELECT JSON_EXTRACT(sensores_indexes, '$.prs') into prs;
 create temporary table tt as select value, sample_time , channel_index from sample_values where client_id=cl_id and channel_index in (tmp,wsp,hum,evp,wdr,rad,prs) and  sample_time between start_time  and end_time ;
 create temporary table yourtable (sensor varchar(255), value float,sample_time datetime);
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = tmp ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('tmp',t_value, t_sample_time);
 end if;
   SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = wsp ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('wsp',t_value, t_sample_time);
 end if;
  SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = hum ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('hum',t_value, t_sample_time);
 end if;
  SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = evp ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('evp',t_value, t_sample_time);
 end if;
  SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = wdr ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('wdr',t_value, t_sample_time);
 end if;
  SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = rad ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('rad',t_value, t_sample_time);
 end if;
  SELECT value , sample_time FROM tt  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) and channel_index = prs ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('prs',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;

 select * from yourtable;
 -- select sensores_indexes;
 drop table yourtable;
 drop table tt;
END
----
CREATE DEFINER=`root`@`%` PROCEDURE `clima_amari_report`(in cl_id int,in sensores_indexes varchar(255) ,in start_time datetime,in end_time datetime,in period int)
BEGIN
 DECLARE tmp int;
 DECLARE wsp int;
 DECLARE hum int;
 DECLARE evp int;
 DECLARE wdr int;
 DECLARE rad int;
 DECLARE prs int;
 DECLARE t_value float;
 DECLARE t_sample_time datetime;
 DECLARE base_start_time datetime;
 set base_start_time = start_time;
 SELECT JSON_EXTRACT(sensores_indexes, '$.tmp') into tmp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.wsp') into wsp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.hum') into hum;
 SELECT JSON_EXTRACT(sensores_indexes, '$.evp') into evp;
 SELECT JSON_EXTRACT(sensores_indexes, '$.wdr') into wdr;
 SELECT JSON_EXTRACT(sensores_indexes, '$.rad') into rad;
 SELECT JSON_EXTRACT(sensores_indexes, '$.prs') into prs;
 create temporary table tt as select value, sample_time , channel_index from sample_values where client_id=cl_id and channel_index in (tmp,wsp,hum,evp,wdr,rad,prs) and  sample_time between start_time  and end_time ;
 create temporary table tt_tmp as select value, sample_time , channel_index from tt where channel_index =tmp and  sample_time between start_time  and end_time ;
 create temporary table tt_wsp as select value, sample_time , channel_index from tt where channel_index =wsp and  sample_time between start_time  and end_time ;
 create temporary table tt_hum as select value, sample_time , channel_index from tt where channel_index =hum and  sample_time between start_time  and end_time ;
 create temporary table tt_evp as select value, sample_time , channel_index from tt where channel_index =evp and  sample_time between start_time  and end_time ;
 create temporary table tt_wdr as select value, sample_time , channel_index from tt where channel_index =wdr and  sample_time between start_time  and end_time ;
 create temporary table tt_rad as select value, sample_time , channel_index from tt where channel_index =rad and  sample_time between start_time  and end_time ;
 create temporary table tt_prs as select value, sample_time , channel_index from tt where channel_index =prs and  sample_time between start_time  and end_time ;

 create temporary table yourtable (sensor varchar(255), value float,sample_time datetime);
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt_tmp  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('tmp',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt_wsp  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE) ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('wsp',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt_hum  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
 if FOUND_ROWS() > 0 then
    insert into yourtable(sensor,value,sample_time) values ('hum',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
 SELECT value , sample_time FROM tt_evp  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('evp',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
  SELECT value , sample_time FROM tt_wdr  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('wdr',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
  SELECT value , sample_time FROM tt_rad  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('rad',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 set start_time = base_start_time;
 loop_label:  LOOP
 if (start_time > end_time) then
 LEAVE  loop_label;
 end if;
  SELECT value , sample_time FROM tt_prs  where  sample_time between start_time and DATE_ADD(start_time, INTERVAL period MINUTE)  ORDER BY sample_time DESC limit 1  into t_value,t_sample_time;
  if FOUND_ROWS() > 0 then
	insert into yourtable(sensor,value,sample_time) values ('prs',t_value, t_sample_time);
 end if;
 set start_time = DATE_ADD(start_time, INTERVAL period MINUTE);
 END loop;
 select * from yourtable;
 drop table yourtable;
 drop table tt;
 drop table tt_tmp;
 drop table tt_wsp;
 drop table tt_hum;
 drop table tt_evp;
 drop table tt_wdr;
 drop table tt_rad;
 drop table tt_prs;
END
---
CREATE DEFINER=`root`@`%` PROCEDURE `detect_rain_start2`(in cl_id int,in ch_index int ,in rain_start_height float,in difftime int,out result bool,out rain_start_time datetime ,out last_sample_time datetime)
BEGIN
	declare  last_val,pre_last_val float;
    declare last_time, pre_last_time datetime;
    select value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit 1 into last_val , last_time;
    set pre_last_time = DATE_SUB(last_time, INTERVAL difftime MINUTE);
    select value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index and sample_time <= pre_last_time order by sample_time desc limit 1 into pre_last_val , pre_last_time;
    create temporary table tt as select value, sample_time from sample_values where client_id=cl_id and channel_index=ch_index and  sample_time between pre_last_time  and last_time order by sample_time asc;
    SELECT sample_time  FROM tt where value > pre_last_val  group by value order by sample_time asc limit 1 into rain_start_time;
    if (last_val-pre_last_val)>=rain_start_height then
       set result = true;
	 else
	   set result = false;
    end if;
    set last_sample_time = last_time;
    drop table tt;
END