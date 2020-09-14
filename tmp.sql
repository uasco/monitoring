CREATE DEFINER=`root`@`%` PROCEDURE `detect_flood_2`(in cl_id int,in ch_index int,in n int,in h float, out alarm bool,out start_flood datetime)
BEGIN
   DECLARE v1 , v2 float;
   DECLARE t1, t2 datetime;
   DECLARE l int;
   create temporary table tt as select  value , sample_time from sample_values where client_id=cl_id and channel_index=ch_index order by sample_time desc limit n ;
   set l = n;
   loop_label:  LOOP
   if (l <= 1) then
   LEAVE  loop_label;
   end if;

   select value , sample_time from tt where sample_time in (select sample_time from tt order by sample_values desc limit l) order by sample_values asc limit 1 into v2 , t2;
   set l = l-1;
   select value , sample_time from tt where sample_time in (select sample_time from tt order by sample_values desc limit l) order by sample_values asc limit 1 into v2 , t2;
   if (v2-v1)>h then
      set alarm = true;
      set start_flood = t2;
       LEAVE  loop_label;
   else
	  set alarm = false;
   end if;

   END loop;


  drop table tt;
END