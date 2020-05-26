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