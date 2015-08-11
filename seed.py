"""Utility file to seed ratings database from MovieLens data in seed_data/"""

from model import Size_Chart, connect_to_db, db
from server import app

def load_size_charts():
    """Load size charts from template-charts into database."""
    with open('seed_data/template-charts', 'r') as size_chart_data:
        for line in size_chart_data:
            line.rstrip()
            row = line.split('|')
    
            size_id = row[0]
            bust = row[1]
            waist = row[2]

            full_length = row[3] 
            center_front = row[4]
            front_shoulder_slope = row[5]
            strap = row[6]
            front_across_shoulder = row[7]
            across_chest = row[8]
            bust_depth = row[9]
            shoulder_length = row[10]
            bust_arc = row[11]
            bust_span = row[12]
            waist_arc = row[13]
            dart_placement = row[14]
            side_length = row[15]

            full_length_back = row[16]
            center_back = row[17]
            back_shoulder_slope = row[18]
            across_back = row[19]
            back_arc = row[20]
            waist_arc_back = row[21]
            back_neck = row[22]
            back_across_shoulder = row[23]
            back_dart_intake = row[24]



            size_chart_inserted = Size_Chart(
                        size_id=size_id,
                        bust=bust, 
                        waist=waist, 

                        full_length=full_length, 
                        center_front=center_front,
                        front_shoulder_slope=front_shoulder_slope,
                        strap=strap,
                        front_across_shoulder=front_across_shoulder,
                        across_chest=across_chest,
                        bust_depth=bust_depth,
                        shoulder_length=shoulder_length,
                        bust_arc=bust_arc,
                        bust_span=bust_span,
                        waist_arc=waist_arc,
                        dart_placement=dart_placement,
                        side_length=side_length,

                        full_length_back=full_length_back,
                        center_back=center_back,
                        back_shoulder_slope=back_shoulder_slope,
                        across_back=across_back,
                        back_arc=back_arc,
                        waist_arc_back=waist_arc_back,
                        back_neck=back_neck,
                        back_across_shoulder=back_across_shoulder,
                        back_dart_intake=back_dart_intake)

            db.session.add(size_chart_inserted)

            db.session.commit()

        

if __name__ == "__main__":
    connect_to_db(app)

    load_size_charts()
