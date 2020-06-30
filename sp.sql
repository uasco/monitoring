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
call detect_rain_alarm(114,24,5,1,@alarm);
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
call detect_rain_start(114,24,@result);
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
call detect_flood_stop(136,74,10,0.2,@flood_stop);
select @flood_stop ;
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