class CreateDegrees < ActiveRecord::Migration
  def change
    create_table :degrees do |t|

      t.timestamps null: false
    end
  end
end
