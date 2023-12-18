"""removed title column to rentals

Revision ID: 93da871be239
Revises: 10947d9f1b3d
Create Date: 2023-12-18 05:36:45.860303

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93da871be239'
down_revision = '10947d9f1b3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.drop_column('price')
        batch_op.drop_column('rating')
        batch_op.drop_column('image')
        batch_op.drop_column('title')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('image', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('rating', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('price', sa.FLOAT(), nullable=True))

    # ### end Alembic commands ###